// Update with your config settings.
const path = require("path")
require("dotenv").config();
const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not defined.");
}
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations")
    },
    seeds: {
      directory: './src/db/seeds', // Update this path if necessary
    },
  },
};
