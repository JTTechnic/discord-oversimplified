import { container } from "@sapphire/framework";
import { Database } from "./Database";
import { Environment } from "@discordextend/interpreter";
import { ContentVariable } from "./variables/ContentVariable";
import { EmbedVariable } from "./variables/EmbedVariable";
import { GetGlobalUserVarVariable } from "./variables/GetGlobalUserVarVariable";
import { GetUserVarVariable } from "./variables/GetUserVarVariable";
import { GetVarVariable } from "./variables/GetVarVariable";
import { SetGlobalUserVarVariable } from "./variables/SetGlobalUserVarVariable";
import { SetUserVarVariable } from "./variables/SetUserVarVariable";
import { SetVarVariable } from "./variables/SetVarVariable";
import { Util } from "./Util";
import { DeleteVariable } from "./variables/DeleteVariable";

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
Util.defineVariable(
	new ContentVariable(),
	new EmbedVariable(),
	new GetGlobalUserVarVariable(),
	new GetUserVarVariable(),
	new GetVarVariable(),
	new SetGlobalUserVarVariable(),
	new SetUserVarVariable(),
	new SetVarVariable(),
	new DeleteVariable()
);
