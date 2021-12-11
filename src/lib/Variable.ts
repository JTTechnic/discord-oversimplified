import type { Container } from "@sapphire/pieces";
import type { InteractionReplyOptions } from "discord.js";

export class Variable {
	/**
	 * Create a new variable
	 * @param container The container to use
	 * @param name The name of the variable
	 * @param definition The definition of the variable
	 */
	public constructor(
		public readonly container: Container,
		public readonly name: string,
		public readonly definition: any
	) {}

	/**
	 * The message options of the client environment
	 */
	protected get messageOptions() {
		return this.container.environment.get("messageoptions") as InteractionReplyOptions;
	}
}
