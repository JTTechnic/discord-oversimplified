"use strict";

const {resolve, join} = require("path");
const {Environment, evaluate, parse} = require("@jttechnic/interpreter");
const Dext = require("discord-extend");
const requireAll = require("require-all");
const Builder = require("./Builder");
const Database = require("./Database");

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
				this._setInteractionVariables(interaction);
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

	// eslint-disable-next-line valid-jsdoc
	/**
	 * @param {import("discord.js").CommandInteraction} interaction - The interaction to get the variables from
	 * @private
	 */
	_setInteractionVariables(interaction) {
		//
		// user data
		//
		this.environment.define("user", interaction.user);
		this.environment.define("username", interaction.user.username);
		this.environment.define("userid", interaction.user.id);
		this.environment.define("tag", interaction.user.tag);
		this.environment.define("avatar", interaction.user.displayAvatarURL({format: "png"}));
		this.environment.define("member", interaction.member);
		this.environment.define("nickname", interaction.member?.displayName);
		//
		// guild data
		//
		this.environment.define("channel", interaction.channel);
		this.environment.define("channelname", interaction.channel?.name);
		this.environment.define("channelid", interaction.channelId);
		this.environment.define("guild", interaction.guild);
		this.environment.define("guildname", interaction.guild?.name);
		this.environment.define("guildid", interaction.guildId);
		//
		// message sending
		//
		this.environment.define("defer", ephemeral => interaction.deferReply({ephemeral}));
		this.environment.define("reply", ephemeral => {
			const messageOptions = this.environment.get("messageoptions");
			messageOptions.ephemeral = ephemeral;
			return interaction.reply(messageOptions);
		});
		this.environment.define("edit", () => interaction.editReply(this.environment.get("messageoptions")));
		this.environment.define("followup", ephemeral => {
			const messageOptions = this.environment.get("messageoptions");
			messageOptions.ephemeral = ephemeral;
			return interaction.followUp(messageOptions);
		});
		//
		// interaction options
		//
		this.environment.define("stringoption", (name, required) => interaction.options.getString(name, required));
		this.environment.define("booleanoption", (name, required) => interaction.options.getBoolean(name, required));
		this.environment.define("integeroption", (name, required) => interaction.options.getInteger(name, required));
		this.environment.define("channeloption", (name, required) => interaction.options.getChannel(name, required));
		this.environment.define("memberoption", (name, required) => interaction.options.getMember(name, required));
		this.environment.define("numberoption", (name, required) => interaction.options.getNumber(name, required));
		this.environment.define("roleoption", (name, required) => interaction.options.getRole(name, required));
		this.environment.define("useroption", (name, required) => interaction.options.getUser(name, required));
		this.environment.define("mentionableoption", (name, required) =>
			interaction.options.getMentionable(name, required)
		);
	}
};
