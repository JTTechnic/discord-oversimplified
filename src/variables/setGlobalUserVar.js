"use strict";

const Variable = require("../Variable");

module.exports = class SetGlobalUserVarVariable extends Variable {
	constructor(client) {
		super(client, "setglobaluservar");
		this.setDefinition((name, value, user) => {
			const vars = this.client.databases.globalUserVars.get(user) ?? {};
			vars[name] = value;
			this.client.databases.globalUserVars.set(user, vars);
		});
	}
};
