"use strict";

const {SlashSubCommand} = require("discord-extend");

module.exports = class Builder {
	/**
	 * Make a new discord-extend slash command
	 * @param {SlashSubCommandInfo} options - The options of the command
	 * @param {function(CommandInteraction): any} runMethod - The run method of the command
	 * @returns {SlashSubCommand}
	 */
	static command(options, runMethod) {
		return new (class extends SlashSubCommand {
			constructor() {
				super(options);
			}

			run(interaction) {
				runMethod(interaction);
			}
		})();
	}
};
