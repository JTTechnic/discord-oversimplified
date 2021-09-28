"use strict";

const Variable = require("../Variable");

module.exports = class SetUserVar extends Variable {
	constructor(client) {
		super(client, "getglobaluservar");
		this.setDefinition((name, user) => (this.client.databases.globalUserVars.get(user) ?? {})[name]);
	}
};
