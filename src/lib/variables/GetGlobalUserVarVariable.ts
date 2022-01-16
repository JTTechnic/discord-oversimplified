import type { PieceContext } from "@sapphire/framework";
import { Variable, VariableOptions } from "../structures/Variable";

export class GetGlobalUserVarVariable extends Variable {
	public constructor(context: PieceContext, options: VariableOptions) {
		super(context, {
			...options,
			name: "getglobaluservar",
			definition: (name: string, user: string) =>
				(this.container.stores.get("databases").get("globaluservars").get(user) ?? {})[name]
		});
	}
}
