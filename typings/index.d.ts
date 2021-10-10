import Dext = require("discord-extend");
import {CommandInteraction} from "discord.js";
import {Environment} from "@discordextend/interpreter";

export interface ClientOptions extends Dext.ClientOptions {
	token: string;
	customVariables?: {
		[name: string]: any;
	};
}

export type DatabaseData<T = any> = {
	[key: string]: T;
};

export class Database<T = any> {
	private static readonly baseDir: string;
	private readonly path: string;
	private readonly data: DatabaseData<T>;
	public constructor(name: string);
	public set(key: string, value: T): void;
	public get(key: string): T;
	private writeData(data: DatabaseData<T>): void;
}

export class Client<Ready extends boolean = boolean> extends Dext.Client<Ready> {
	public readonly environment: Environment;
	public readonly options: ClientOptions;
	public readonly databases: {
		vars: Database;
		userVars: Database<{
			[user: string]: {
				[key: string]: any;
			};
		}>;
		globalUserVars: Database<{
			[key: string]: any;
		}>;
	};
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
