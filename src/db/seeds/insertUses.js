/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('uses').del()
  await knex('uses').insert([
    {
      id: 1,
      urlId: 1,
    },
    {
      id: 2,
      urlId: 1,
    },
  ]);
};
