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
