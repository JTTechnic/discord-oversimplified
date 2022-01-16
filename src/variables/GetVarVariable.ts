import { container, PieceContext } from "@sapphire/framework";
import { Variable, VariableOptions } from "../lib/structures/Variable";

export class GetVarVariable extends Variable {
	public constructor(context: PieceContext, options: VariableOptions) {
		super(context, {
			...options,
			name: "getvar",
			enabled: container.client.options.databasesEnabled,
			definition: (name: string) => this.container.stores.get("databases").get("vars").get(name)
		});
	}
}
