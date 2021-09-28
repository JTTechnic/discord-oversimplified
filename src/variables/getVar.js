"use strict";

const Variable = require("../Variable");

module.exports = class GetVarVariable extends Variable {
	constructor(client) {
		super(client, "getvar");
		this.setDefinition(name => this.client.databases.vars.get(name));
	}
};
