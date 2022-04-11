import { Piece, PieceContext, PieceOptions } from "@sapphire/framework";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";

export interface DatabaseData<T = any> {
	[key: string]: T;
}

export interface DatabaseOptions extends PieceOptions {
	readonly name: string;
}

export class Database<T = any> extends Piece<DatabaseOptions> {
	/**
	 * The path of the database file
	 */
	private readonly path: string;
	/**
	 * The data of the database
	 */
	private data: DatabaseData<T> = {};

	/**
	 * Create a new database
	 *
	 * **Note:** database files are saved in json format
	 * @param name The name of the database
	 */
	public constructor(context: PieceContext, options: DatabaseOptions) {
		super(context, options);
		this.path = `${Database.BASE_DIR}/${options.name}.json`;
	}

	public override onLoad() {
		if (!existsSync(Database.BASE_DIR)) mkdirSync(Database.BASE_DIR);
		if (!existsSync(this.path)) this.writeData({});

		this.data = JSON.parse(readFileSync(this.path, { encoding: "utf8" }));

		return super.onLoad();
	}

	/**
	 * Set data in the database
	 * @param key The key to set
	 * @param value The value for the key
	 */
	public set(key: string, value: T): void  {
		this.data[key] = value;
		this.writeData();
	}

	/**
	 * Get data from the database
	 * @param key The key to get data from
	 * @returns The found data
	 */
	public get(key: string) {
		return this.data[key] || null;
	}

	/**
	 * Write data to the database
	 * @param data The data to write
	 */
	private writeData(data = this.data) {
		writeFileSync(this.path, JSON.stringify(data));
	}

	/**
	 * The base directory for the databases
	 */
	private static readonly BASE_DIR = "database";
}
