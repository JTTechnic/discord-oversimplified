"use strict";

// eslint-disable-next-line no-unused-vars
const {MessageEmbed} = require("discord.js");
const Variable = require("./Variable");
const VariableManager = require("./VariableManager");

module.exports = class Interpeter {
	constructor() {
		this.variables = {
			/** @type {MessageEmbed[]} */
			embeds: [],
			/** @type {string} */
			content: null
		};
		/**
		 * @type {VariableManager}
		 */
		this.variableManager = new VariableManager(this);
	}

	interpet(code) {
		const lines = this.getLines(code);

		for (const line of lines) {
			const result = this.getVariable(this.getTokens(line));
			const {variable, path} = result;
			if (!this.isValidVariable(variable)) {
				if (!this.variables.content) this.variables.content = line;
				else this.variables.content += `\n${line}`;
				continue;
			}
			if (variable instanceof Variable) {
				variable.construct();
				continue;
			}
			eval(`this.variableManager.variables.get("${path.shift()}").${path.join(".")}(...result.params)`);
		}

		return this;
	}

	/**
	 * @param {string} code - The code to get lines from
	 * @returns {string[]}
	 * @private
	 */
	getLines(code) {
		/*
		 * Steps:
		 * Split the code into lines by line breaks and semicolons
		 * Trim all lines
		 * Filter lines which are not empty
		 */
		return code
			.trim()
			.split(/[\n;]/)
			.map(line => line.trim())
			.filter(line => line);
	}

	/**
	 * @param {string} line - The line to get tokens from
	 * @returns {string[]}
	 * @private
	 */
	getTokens(line) {
		/*
		 * Steps:
		 * Split lines by space or special tokens
		 * Filter tokens which are not undefined
		 */
		return line.split(/ |([.,()])/).filter(token => token);
	}

	// eslint-disable-next-line valid-jsdoc
	/**
	 * @param {string[]} tokens - The tokens to get the variable from
	 * @returns {{
	 * 	variable: Variable | Function | null;
	 * 	path: string[];
	 * 	params: string[];
	 * }}
	 * @private
	 */
	getVariable(tokens) {
		let foundVariable,
			foundVariablePath = [],
			gettingProperty = false,
			startingMethod = false,
			endingMethod = false,
			params = [],
			newParam = false;
		tokens.some((token, index) => {
			if (index === 0) {
				if (!this.variableManager.variables.has(token)) return true;
				foundVariable = this.variableManager.variables.get(token);
				foundVariablePath.push(token);
				return false;
			}
			if (token === ".") {
				if (gettingProperty) {
					foundVariable = undefined;
					return true;
				}
				if (foundVariable) {
					gettingProperty = true;
					return false;
				}
			}
			if (gettingProperty) {
				if (foundVariable.hiddenProperties?.includes(token) || !foundVariable[token]) {
					foundVariable = undefined;
					return true;
				}
				gettingProperty = false;
				foundVariable = foundVariable[token];
				foundVariablePath.push(token);
				return false;
			}
			if (token === "(") {
				if (startingMethod || !foundVariable || endingMethod) {
					foundVariable = undefined;
					return true;
				}
				startingMethod = true;
				return false;
			}
			if (token === ")") {
				if (!startingMethod || !foundVariable || endingMethod) {
					foundVariable = undefined;
					return true;
				}
				startingMethod = false;
				endingMethod = true;
				return false;
			}
			if (startingMethod) {
				if (token === ",") {
					if (newParam) {
						foundVariable = undefined;
						return true;
					}
					newParam = true;
					return false;
				}
				if (!/^[a-zA-Z0-9]*$/.test(token)) {
					foundVariable = undefined;
					return true;
				}
				if (!params.length || newParam) {
					params.push(token);
					newParam = false;
				} else {
					params[params.length - 1] += ` ${token}`;
				}
				return false;
			}
			foundVariable = undefined;
			return true;
		});
		return {
			variable: foundVariable ?? null,
			path: foundVariablePath,
			params
		};
	}

	/**
	 * @param {Variable | Function | null} variable - The variable to validate
	 * @returns {boolean}
	 * @private
	 */
	isValidVariable(variable) {
		return (variable instanceof Variable && variable.construct) || variable instanceof Function;
	}
};
