import { container } from "@sapphire/framework";
import { Environment } from "@discordextend/interpreter";
import { DatabaseStore } from "./structures/DatabaseStore";
import { VariableStore } from "./structures/VariableStore";

declare module "@sapphire/pieces" {
	export interface Container {
		environment: Environment;
	}
}

container.stores.register(new DatabaseStore());
container.stores.register(new VariableStore());
container.environment = new Environment();
