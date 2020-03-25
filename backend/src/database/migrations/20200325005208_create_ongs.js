
exports.up = function(knex) {
  /**
   * UP é responsável por criar a tabela
   * O que acontecerá quando a migration for executada
   */
  return knex.schema.createTable('ongs', function(table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) {
  /**
   * Usado para desfazer a tabela
   */
  return knex.schema.dropTable('ongs');
};
