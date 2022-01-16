import { Piece, PieceContext, PieceOptions } from "@sapphire/framework";
import type { InteractionReplyOptions } from "discord.js";

export interface VariableOptions extends PieceOptions {
	name: string;
	definition: any;
}

export class Variable extends Piece<VariableOptions> {
	public readonly definition: any;

	/**
	 * Create a new variable
	 * @param name The name of the variable
	 * @param definition The definition of the variable
	 */
	public constructor(context: PieceContext, options: VariableOptions) {
		super(context, options);
		this.definition = options.definition;
	}

	/**
	 * The message options of the client environment
	 */
	protected get messageOptions() {
		return this.container.environment.get("messageoptions") as InteractionReplyOptions;
	}
}
