import { Database, DatabaseOptions } from "../lib/structures/Database";
import { container, PieceContext } from "@sapphire/framework";

export class UserVariableDatabase extends Database<{
	[user: string]:
		| {
				[key: string]: any;
		  }
		| undefined;
}> {
	public constructor(context: PieceContext, options: DatabaseOptions) {
		super(context, {
			...options,
			name: "uservars",
			enabled: container.client.options.databasesEnabled
		});
	}
}
