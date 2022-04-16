import type { PieceContext } from "@sapphire/framework";
import { Variable, VariableOptions } from "../lib/structures/Variable";

export class JSEvalVariable extends Variable {
	public constructor(context: PieceContext, options: VariableOptions) {
		super(context, {
			...options,
			name: "jseval",
			// eslint-disable-next-line no-eval
			definition: eval
		});
	}
}
