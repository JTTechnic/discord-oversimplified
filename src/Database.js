"use strict";

const {existsSync, writeFileSync, mkdirSync} = require("fs");
const {resolve} = require("path");

/**
 * @template T
 */
class Database {
	/**
	 * @typedef {Object} DatabaseData
	 */

	constructor(name) {
		/**
		 * @type {string}
		 * @private
		 * @readonly
		 */
		this.path = `${Database.baseDir}/${name}.json`;

		if (!existsSync(Database.baseDir)) mkdirSync(Database.baseDir);
		if (!existsSync(this.path)) this.writeData({});

		/**
		 * @type {DatabaseData}
		 * @private
		 * @readonly
		 */
		this.data = require(resolve(this.path));
	}

	/**
	 * @param {string} key - The key to set the value to
	 * @param {T} value - The value to set
	 */
	set(key, value) {
		this.data[key] = value;
		this.writeData();
	}

	/**
	 * @param {string} key - The key to get the value from
	 * @returns {T}
	 */
	get(key) {
		return this.data[key];
	}

	/**
	 * @param {DatabaseData} data - The data to write
	 * @private
	 */
	writeData(data = this.data) {
		writeFileSync(this.path, JSON.stringify(data));
	}
}

Database.baseDir = "database";

module.exports = Database;
