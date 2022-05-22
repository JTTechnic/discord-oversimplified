import { container } from "@sapphire/framework";
import { Environment } from "@hammerlang/interpreter";

declare module "@sapphire/pieces" {
	export interface Container {
		environment: Environment;
	}
}

container.environment = new Environment();
