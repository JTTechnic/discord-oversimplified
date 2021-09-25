"use strict";

// eslint-disable-next-line no-unused-vars
const Interpeter = require("./Interpeter");

/**
 * @abstract
 */
module.exports = class Variable {
	/**
	 * @param {Interpeter} interpeter - The interpeter to use
	 * @param {string} name - The name of the variables
	 * @param {string[]} hiddenProperties - The properties to hide from the interpeter
	 */
	constructor(interpeter, name, hiddenProperties) {
		/** @type {Interpeter} */
		this.interpeter = interpeter;
		/** @type {string} */
		this.name = name;
		/** @type {string[]} */
		this.hiddenProperties = hiddenProperties;
	}
};
