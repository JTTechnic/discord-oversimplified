import { Database, DatabaseOptions } from "../structures/Database";
import type { PieceContext } from "@sapphire/framework";

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
			name: "uservars"
		});
	}
}
