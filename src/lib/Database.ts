import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

export interface DatabaseData<T = any> {
	[key: string]: T;
}

export class Database<T = any> {
	/**
	 * The base directory for the databases
	 */
	private static readonly BASE_DIR = "database";
	/**
	 * The path of the database file
	 */
	private readonly path: string;
	/**
	 * The data of the database
	 */
	private readonly data: DatabaseData<T>;

	/**
	 * Create a new database
	 *
	 * **Note:** database files are saved in json format
	 * @param name The name of the database
	 */
	public constructor(name: string) {
		this.path = `${Database.BASE_DIR}/${name}.json`;

		if (!existsSync(Database.BASE_DIR)) mkdirSync(Database.BASE_DIR);
		if (!existsSync(this.path)) this.writeData({});

		// eslint-disable-next-line @typescript-eslint/no-require-imports
		this.data = require(resolve(this.path));
	}

	/**
	 * Set data in the database
	 * @param key The key to set
	 * @param value The value for the key
	 */
	public set(key: string, value: T) {
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
}
