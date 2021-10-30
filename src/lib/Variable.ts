import type { InteractionReplyOptions } from "discord.js";
import type { Client } from "./Client";

export class Variable {
	/**
	 * Create a new variable
	 * @param client The client to use
	 * @param name The name of the variable
	 * @param definition The definition of the variable
	 */
	public constructor(public readonly client: Client, public readonly name: string, public readonly definition: any) {}

	/**
	 * The message options of the client environment
	 */
	protected get messageOptions() {
		return this.client.environment.get("messageoptions") as InteractionReplyOptions;
	}
}
