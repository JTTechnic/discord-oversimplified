"use strict";

const Variable = require("../Variable");

module.exports = class EmbedVariable extends Variable {
	constructor(client) {
		super(client, "content");

		const content = {
			set: text => {
				this.messageOptions.content = text;
			},
			add: text => {
				this.messageOptions.content ??= "";
				this.messageOptions.content += text;
			},
			addln: text => {
				if (!this.messageOptions.content) content.add(text);
				this.messageOptions.content += `\n${text}`;
			}
		};

		this.setDefinition(content);
	}
};
