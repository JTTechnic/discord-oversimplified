"use strict";

// eslint-disable-next-line no-unused-vars
const Client = require("./Client");

module.exports = class Variable {
	/**
	 * @param {Client} client - The client to use
	 * @param {string} name - The name of the variable
	 */
	constructor(client, name) {
		/**
		 * @type {Client}
		 */
		this.client = client;
		/**
		 * @type {string}
		 */
		this.name = name;
	}

	/**
	 * @template D
	 * @param {D} definition - The definition of the variable
	 */
	setDefinition(definition) {
		/**
		 * @type {D}
		 */
		this.definition = definition;
	}

	// eslint-disable-next-line valid-jsdoc
	/** @type {import("discord.js").InteractionReplyOptions} */
	get messageOptions() {
		return this.client.environment.get("messageoptions");
	}

	set messageOptions(messageOptions) {
		this.client.environment.set("messageoptions", messageOptions);
	}
};
