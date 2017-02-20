
exports.up = function(knex, Promise) {
    return knex.schema.
    alterTable('players', function(table){
        table.string('player_mp');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('players')
      .dropTableIfExists('users')
};
