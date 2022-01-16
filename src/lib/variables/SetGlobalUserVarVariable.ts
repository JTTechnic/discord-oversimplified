import type { PieceContext } from "@sapphire/framework";
import { Variable, VariableOptions } from "../structures/Variable";

export class SetGlobalUserVarVariable extends Variable {
	public constructor(context: PieceContext, options: VariableOptions) {
		super(context, {
			...options,
			name: "setglobaluservar",
			definition: (name: string, value: any, user: string) => {
				const database = this.container.stores.get("databases").get("globaluservars");
				const vars = database.get(user) ?? {};
				vars[name] = value;
				database.set(user, vars);
			}
		});
	}
}
