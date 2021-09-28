"use strict";

const Variable = require("../Variable");

module.exports = class GetUserVarVariable extends Variable {
	constructor(client) {
		super(client, "getuservar");
		this.setDefinition(
			(name, user, guild) => ((this.client.databases.userVars.get(guild) ?? {})[user] ?? {})[name]
		);
	}
};
