import Dext = require("discord-extend");
import {CommandInteraction, MessageEmbed, Collection} from "discord.js";

export interface ClientOptions extends Dext.ClientOptions {
	token: string;
	customVariables?: string | typeof Variable[];
}

export class Client extends Dext.Client {
	public constructor(options: ClientOptions);
	public command(trigger: string, code: string): void;
	public commandsIn(dir: string): void;
	private _validateCommand(trigger: string, code: string): void;
}

export class Builder {
	public static command(
		options: Dext.SlashSubCommandInfo,
		runMethod: (interaction: CommandInteraction) => any
	): Dext.SlashSubCommand;
}

export abstract class Variable {
	public constructor(interpeter: Interpeter, name: string, hiddenProperties: string[]);
	public readonly interpeter: Interpeter;
	public readonly name: string;
	public readonly hiddenProperties: string[];
}

export class VariableManager {
	public constructor(client: Client, interpeter: Interpeter);
	public readonly variables: Collection<string, Variable>;
}

type VariableResolvable = Variable | Function | null;

export class Interpeter {
	public readonly variables: {
		embeds: MessageEmbed[];
		content: string | null;
	};
	protected readonly variableManager: VariableManager;
	public constructor(client: Client);
	public interpet(code: string): this;
	private getLines(code: string): string[];
	private getTokens(line: string): string[];
	private getVariable(tokens: string[]): {
		variable: VariableResolvable;
		path: string[];
		params: string[];
	};
	private isValidVariable(variable: VariableResolvable): variable is (Variable & {construct: Function}) | Function;
}
