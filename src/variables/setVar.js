"use strict";

const Variable = require("../Variable");

module.exports = class SetVarVariable extends Variable {
	constructor(client) {
		super(client, "setvar");

		this.setDefinition((name, value) => {
			this.client.databases.vars.set(name, value);
		});
	}
};
