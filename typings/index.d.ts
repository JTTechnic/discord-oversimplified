import Dext = require("discord-extend");
import {CommandInteraction} from "discord.js";

interface ClientOptions extends Dext.ClientOptions {
	token: string;
	customVariables?: {
		[name: string]: any;
	};
}

declare class Environment {
	public constructor(parent: Environment);
	extend(): Environment;
	lookup(name: string): Environment;
	get(name: string): any;
	set(name: string, value: any): any;
	define(name: string, value: any): any;
}

declare class Client<Ready extends boolean = boolean> extends Dext.Client<Ready> {
	public readonly environment: Environment;
	public readonly options: ClientOptions;
	public constructor(options: ClientOptions);
	public command(trigger: string, code: string): void;
	public commandsIn(dir: string): void;
	private _validateCommand(trigger: string, code: string): void;
	private _initEnvironment(): void;
}

declare class Builder {
	public static command(
		options: Dext.SlashSubCommandInfo,
		runMethod: (interaction: CommandInteraction) => any
	): Dext.SlashSubCommand;
}

export {ClientOptions, Client, Builder};
