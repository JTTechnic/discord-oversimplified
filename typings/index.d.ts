import Dext = require("discord-extend");
import {CommandInteraction} from "discord.js";

export interface ClientOptions extends Dext.ClientOptions {
	token: string;
}

export class Client extends Dext.Client {
	public constructor(options: ClientOptions);
	public command(trigger: string, code: string): void;
}

export class Builder {
	public static command(
		options: Dext.SlashSubCommandInfo,
		runMethod: (interaction: CommandInteraction) => any
	): Dext.SlashSubCommand;
}
