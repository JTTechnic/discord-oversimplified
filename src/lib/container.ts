import { container } from "@sapphire/framework";
import { Database } from "./Database";
import { Environment } from "@discordextend/interpreter";

declare module "@sapphire/pieces" {
	export interface Container {
		databases: {
			vars: Database;
			userVars: Database<{
				[user: string]:
					| {
							[key: string]: any;
					  }
					| undefined;
			}>;
			globalUserVars: Database<{
				[key: string]: any;
			}>;
		};
		environment: Environment;
	}
}

container.databases = {
	vars: new Database("vars"),
	userVars: new Database<{
		[user: string]:
			| {
					[key: string]: any;
			  }
			| undefined;
	}>("uservars"),
	globalUserVars: new Database<{
		[key: string]: any;
	}>("globaluservars")
};
container.environment = new Environment();
