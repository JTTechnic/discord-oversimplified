import { container } from "@sapphire/framework";
import { Database } from "./Database";
import { Environment } from "@discordextend/interpreter";
import requireAll from "require-all";
import { join } from "node:path";
import type { Variable } from "./Variable";

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
Object.values(requireAll(join(__dirname, "lib/variables"))).forEach((variable: any) => {
	const createdVariable = new variable() as Variable;
	container.environment.define(createdVariable.name, createdVariable.definition);
});
