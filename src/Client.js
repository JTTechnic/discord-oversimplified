"use strict";

const {resolve, join} = require("path");
const Dext = require("discord-extend");
const requireAll = require("require-all");
const Builder = require("./Builder");
const Database = require("./Database");
const {evaluate, parse} = require("./interpreter");
const Environment = require("./interpreter/Environment");

module.exports = class Client extends Dext.Client {
	/**
	 * @typedef {import("discord-extend").ClientOptions & {
	 * 	token: string;
	 * 	customVariables?: {
	 * 		[name: string]: any;
	 * 	};
	 * }} ClientOptions
	 */

	/**
	 * @param {ClientOptions} options - The options of the client
	 */
	constructor(options) {
		super(options);

		if (typeof options.customVariables === "string") {
			options.customVariables = Object.values(requireAll(resolve(options.customVariables)));
		}

		this.options.customVariables = options.customVariable ?? {};

		/**
		 * @type {{
		 * 	vars: Database<string>;
		 * 	userVars: Database<{
		 * 		[user: string]: {
		 * 			[key: string]: string;
		 * 		}
		 * 	}>;
		 * 	globalUserVars: Database<{
		 * 		[key: string]: string;
		 * 	}>;
		 * }}
		 */
		this.databases = {
			vars: new Database("vars"),
			userVars: new Database("uservars"),
			globalUserVars: new Database("globaluservars")
		};

		/**
		 * @type {Environment}
		 * @readonly
		 */
		this.environment = new Environment();

		this._initEnvironment();
		this.login(options.token);
	}

	/**
	 * Add a command
	 * @param {string} trigger - The name of the full command (with sub command group and sub command) to use as trigger
	 * @param {string} code - The code to run when this command is triggered
	 */
	command(trigger, code) {
		this._validateCommand(trigger, code);
		const command = Builder.command(
			{
				name: trigger,
				description: trigger
			},
			// eslint-disable-next-line no-unused-vars
			interaction => {
				this.environment.define("messageoptions", {});
				evaluate(parse(code), this.environment);
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

	/**
	 * @private
	 */
	_initEnvironment() {
		Object.values(requireAll(join(__dirname, "variables"))).forEach(variable => {
			// eslint-disable-next-line new-cap
			variable = new variable(this);
			this.environment.define(variable.name, variable.definition);
		});
		for (const name in this.options.customVariables) {
			this.environment.define(name, this.options.customVariables[name]);
		}
	}
};
