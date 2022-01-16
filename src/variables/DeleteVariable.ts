import type { PieceContext } from "@sapphire/framework";
import type { Message } from "discord.js";
import { Variable, VariableOptions } from "../lib/structures/Variable";

export class DeleteVariable extends Variable {
	public constructor(context: PieceContext, options: VariableOptions) {
		super(context, {
			...options,
			name: "delete",
			definition: (message: Message, seconds = 0) => {
				setTimeout(() => void message.delete(), seconds * 1000);
			}
		});
	}
}
