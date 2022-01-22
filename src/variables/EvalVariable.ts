import { evaluate, parse } from "@discordextend/interpreter";
import type { PieceContext } from "@sapphire/framework";
import { Variable, VariableOptions } from "../lib/structures/Variable";

export class EvalVariable extends Variable {
	public constructor(context: PieceContext, options: VariableOptions) {
		super(context, {
			...options,
			name: "eval",
			definition: (code: string) => evaluate(parse(code), this.container.environment)
		});
	}
}
