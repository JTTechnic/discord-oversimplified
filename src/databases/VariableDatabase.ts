import { Database, DatabaseOptions } from "../lib/structures/Database";
import type { PieceContext } from "@sapphire/framework";

export class VariableDatabase extends Database {
	public constructor(context: PieceContext, options: DatabaseOptions) {
		super(context, {
			...options,
			name: "vars"
		});
	}
}
