import { Store } from "@sapphire/framework";
import { Database } from "./Database";
import { join } from "node:path";
import type { GlobalUserVariableDatabase } from "../databases/GlobalUserVariableDatabase";
import type { UserVariableDatabase } from "../databases/UserVariableDatabase";
import type { VariableDatabase } from "../databases/VariableDatabase";

export class DatabaseStore extends Store<Database> {
	public constructor() {
		super(Database, { name: "databases", paths: [join(__dirname, "databases")] });
	}

	public override get<K extends keyof DatabaseStoreEntries>(key: K): DatabaseStoreEntries[K];
	public override get(key: string) {
		return super.get(key);
	}
}

declare module "@sapphire/framework" {
	interface StoreRegistryEntries {
		databases: DatabaseStore;
	}
}

export interface DatabaseStoreEntries {
	globaluservars: GlobalUserVariableDatabase;
	uservars: UserVariableDatabase;
	vars: VariableDatabase;
}
