import type { Client } from "../Client";
import { Variable } from "../Variable";

module.exports = class ContentVariable extends Variable {
	public constructor(client: Client) {
		super(client, "content", {
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
