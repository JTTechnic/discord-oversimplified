import { Database, DatabaseOptions } from "../lib/structures/Database";
import { container, PieceContext } from "@sapphire/framework";

export class VariableDatabase extends Database {
	public constructor(context: PieceContext, options: DatabaseOptions) {
		super(context, {
			...options,
			name: "vars",
			enabled: container.client.options.databasesEnabled
		});
	}
}
