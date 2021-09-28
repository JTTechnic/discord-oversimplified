import Dext = require("discord-extend");
import {CommandInteraction} from "discord.js";
import {Environment} from "@jttechnic/interpreter";

export interface ClientOptions extends Dext.ClientOptions {
	token: string;
	customVariables?: {
		[name: string]: any;
	};
}

export class Client<Ready extends boolean = boolean> extends Dext.Client<Ready> {
	public readonly environment: Environment;
	public readonly options: ClientOptions;
	public constructor(options: ClientOptions);
	public command(trigger: string, code: string): void;
	public commandsIn(dir: string): void;
	private _validateCommand(trigger: string, code: string): void;
	private _initEnvironment(): void;
}

export class Builder {
	public static command(
		options: Dext.SlashSubCommandInfo,
		runMethod: (interaction: CommandInteraction) => any
	): Dext.SlashSubCommand;
}
