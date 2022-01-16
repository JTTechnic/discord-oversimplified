import { container, PieceContext } from "@sapphire/framework";
import { Variable, VariableOptions } from "../lib/structures/Variable";

export class GetUserVarVariable extends Variable {
	public constructor(context: PieceContext, options: VariableOptions) {
		super(context, {
			...options,
			name: "getuservar",
			enabled: container.client.options.databasesEnabled,
			definition: (name: string, user: string, guild: string) =>
				((this.container.stores.get("databases").get("uservars").get(guild) ?? {})[user] ?? {})[name]
		});
	}
}
