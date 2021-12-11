import { container } from "@sapphire/framework";
import type { InteractionReplyOptions } from "discord.js";

export class Variable {
	public readonly container: typeof container;

	/**
	 * Create a new variable
	 * @param container The container to use
	 * @param name The name of the variable
	 * @param definition The definition of the variable
	 */
	public constructor(public readonly name: string, public readonly definition: any) {
		this.container = container;
	}

	/**
	 * The message options of the client environment
	 */
	protected get messageOptions() {
		return this.container.environment.get("messageoptions") as InteractionReplyOptions;
	}
}
