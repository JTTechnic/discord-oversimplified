"use strict";

const {join} = require("path");
const {Collection} = require("discord.js");
const requireAll = require("require-all");
// eslint-disable-next-line no-unused-vars
const Variable = require("./Variable");

module.exports = class VariableManager {
	// eslint-disable-next-line valid-jsdoc
	/**
	 * @param {import("./Interpeter")} interpeter
	 */
	constructor(interpeter) {
		/**
		 * @type {Collection<string, Variable>}
		 */
		this.variables = new Collection();
		Object.values(requireAll(join(__dirname, "variables")))
			// eslint-disable-next-line new-cap
			.map(variable => new variable(interpeter))
			.forEach(variable => this.variables.set(variable.name, variable));
	}
};
