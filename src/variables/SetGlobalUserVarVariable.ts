import { container, PieceContext } from "@sapphire/framework";
import { Variable, VariableOptions } from "../lib/structures/Variable";

export class SetGlobalUserVarVariable extends Variable {
	public constructor(context: PieceContext, options: VariableOptions) {
		super(context, {
			...options,
			name: "setglobaluservar",
			enabled: container.client.options.databasesEnabled,
			definition: (name: string, value: any, user: string) => {
				const database = this.container.stores.get("databases").get("globaluservars");
				const vars = database.get(user) ?? {};
				vars[name] = value;
				database.set(user, vars);
			}
		});
	}
}
