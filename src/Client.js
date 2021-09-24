"use strict";

const Dext = require("discord-extend");
const Builder = require("./Builder");

module.exports = class Client extends Dext.Client {
	/**
	 * @typedef {import("discord-extend").ClientOptions & {
	 * 	token: string;
	 * }} ClientOptions
	 */

	/**
	 * @param {ClientOptions} options - The options of the client
	 */
	constructor(options) {
		super(options);

		this.login(options.token);
	}

	/**
	 * Add a command
	 * @param {string} trigger - The name of the full command (with sub command group and sub command) to use as trigger
	 * @param {string} code - The code to run when this command is triggered
	 */
	command(trigger, code) {
		const splitTrigger = trigger.split(" ");
		if (splitTrigger.some(triggerName => !/^[\w-]*$/.test(triggerName))) {
			throw new SyntaxError("Trigger must use only letters, digits and -");
		}
		if (splitTrigger.some(triggerName => triggerName.length < 1 || triggerName.length > 32)) {
			throw new SyntaxError("The length triggers parts have must be between 1 and 32 characters");
		}
		if (splitTrigger.length > 3) {
			throw new SyntaxError("The trigger of a command can have no more than two spaces");
		}

		const command = Builder.command(
			{
				name: trigger,
				description: trigger
			},
			interaction => {
				interaction.reply(code);
			}
		);
		this.registry.registerCommand(command);
	}
};
