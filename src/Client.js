"use strict";

const {resolve} = require("path");
const Dext = require("discord-extend");
const requireAll = require("require-all");
const Builder = require("./Builder");
const Interpeter = require("./Interpeter");

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
		this._validateCommand(trigger, code);
		const interpeter = new Interpeter();
		const command = Builder.command(
			{
				name: trigger,
				description: trigger
			},
			interaction => {
				interaction.reply(interpeter.interpet(code).variables);
			}
		);
		this.registry.registerCommand(command);
	}

	/**
	 * Adds commands from a directory
	 * @param {string} dir - The directory to add the commands from
	 */
	commandsIn(dir) {
		dir = resolve(dir);
		Object.values(requireAll(dir)).forEach(command => {
			this.command(command.trigger, command.code);
		});
	}

	/**
	 * Validates a command
	 * @param {string} trigger - The trigger of the command
	 * @param {string} code - The code of the command
	 * @private
	 */
	_validateCommand(trigger, code) {
		if (typeof trigger !== "string") throw new TypeError("Command trigger must be a string");
		if (typeof code !== "string") throw new TypeError("Command code must be a string");
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
	}
};
