const knex = require("../db/connection");

function list() {
  return knex("urls").select("*");
}

module.exports = {
  list,
};
