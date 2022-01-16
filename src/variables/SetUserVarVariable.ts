import type { PieceContext } from "@sapphire/framework";
import { Variable, VariableOptions } from "../lib/structures/Variable";

export class SetUserVarVariable extends Variable {
	public constructor(context: PieceContext, options: VariableOptions) {
		super(context, {
			...options,
			name: "setuservar",
			definition: (name: string, value: any, user: string, guild: string) => {
				const database = this.container.stores.get("databases").get("uservars");
				const vars = database.get(guild) ?? {};
				(vars[user] ??= {})[name] = value;
				database.set(guild, vars);
			}
		});
	}
}
