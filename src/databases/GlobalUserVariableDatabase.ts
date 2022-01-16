import { Database, DatabaseOptions } from "../lib/structures/Database";
import { container, PieceContext } from "@sapphire/framework";

export class GlobalUserVariableDatabase extends Database<{ [key: string]: any }> {
	public constructor(context: PieceContext, options: DatabaseOptions) {
		super(context, {
			...options,
			name: "globaluservars",
			enabled: container.client.options.databasesEnabled
		});
	}
}
