import { Store } from "@sapphire/framework";
import { Database } from "./Database";
import type { GlobalUserVariableDatabase } from "../../databases/GlobalUserVariableDatabase";
import type { UserVariableDatabase } from "../../databases/UserVariableDatabase";
import type { VariableDatabase } from "../../databases/VariableDatabase";

export class DatabaseStore extends Store<Database> {
	public constructor() {
		super(Database, { name: "databases" });
	}

	public override get<K extends keyof DatabaseStoreEntries>(key: K): DatabaseStoreEntries[K];
	public override get(key: string) {
		return super.get(key);
	}
}

export interface DatabaseStoreEntries {
	globaluservars: GlobalUserVariableDatabase;
	uservars: UserVariableDatabase;
	vars: VariableDatabase;
}
