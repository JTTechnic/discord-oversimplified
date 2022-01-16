import type { PieceContext } from "@sapphire/framework";
import { Variable, VariableOptions } from "../structures/Variable";

export class GetUserVarVariable extends Variable {
	public constructor(context: PieceContext, options: VariableOptions) {
		super(context, {
			...options,
			name: "getuservar",
			definition: (name: string, user: string, guild: string) =>
				((this.container.stores.get("databases").get("uservars").get(guild) ?? {})[user] ?? {})[name]
		});
	}
}
