"use strict";

const Variable = require("../Variable");

module.exports = class SetUserVar extends Variable {
	constructor(client) {
		super(client, "setuservar");
		this.setDefinition((name, value, user, guild) => {
			const vars = this.client.databases.userVars.get(guild) ?? {};
			(vars[user] ??= {})[name] = value;
			this.client.databases.userVars.set(guild, vars);
		});
	}
};
