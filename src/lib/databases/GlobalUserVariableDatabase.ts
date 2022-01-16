import { Database, DatabaseOptions } from "../structures/Database";
import type { PieceContext } from "@sapphire/framework";

export class GlobalUserVariableDatabase extends Database<{ [key: string]: any }> {
	public constructor(context: PieceContext, options: DatabaseOptions) {
		super(context, {
			...options,
			name: "globaluservars"
		});
	}
}
