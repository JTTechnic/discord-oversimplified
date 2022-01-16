import type { DatabaseStore } from "./structures/DatabaseStore";
import type { VariableStore } from "./structures/VariableStore";

declare module "@sapphire/framework" {
	export interface StoreRegistryEntries {
		databases: DatabaseStore;
		variables: VariableStore;
	}
}
