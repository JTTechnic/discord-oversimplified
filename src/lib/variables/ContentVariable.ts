import type { PieceContext } from "@sapphire/framework";
import { Variable, VariableOptions } from "../structures/Variable";

export class ContentVariable extends Variable {
	public constructor(context: PieceContext, options: VariableOptions) {
		super(context, {
			...options,
			name: "content",
			definition: {
				set: (text: string) => {
					this.messageOptions.content = text;
				},
				add: (text: string) => {
					this.messageOptions.content ??= "";
					this.messageOptions.content += text;
				},
				addln: (text: string) => {
					if (!this.messageOptions.content) return this.definition.add(text);
					this.messageOptions.content += `\n${text}`;
				}
			}
		});
	}
}
