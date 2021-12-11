import type { Container } from "@sapphire/pieces";
import { Variable } from "../Variable";

module.exports = class ContentVariable extends Variable {
	public constructor(container: Container) {
		super(container, "content", {
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
		});
	}
};
