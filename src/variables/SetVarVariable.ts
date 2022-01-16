import type { PieceContext } from "@sapphire/framework";
import { Variable, VariableOptions } from "../lib/structures/Variable";

export class SetVarVariable extends Variable {
	public constructor(context: PieceContext, options: VariableOptions) {
		super(context, {
			...options,
			name: "setvar",
			definition: (name: string, value: any) => {
				this.container.stores.get("databases").get("vars").set(name, value);
			}
		});
	}
}
