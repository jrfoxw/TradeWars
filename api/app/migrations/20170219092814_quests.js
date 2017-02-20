
exports.up = function(knex, Promise) {
   return knex.schema.createTableIfNotExists('quests', function(table){
      table.increments('id');
      table.string('quest_id');
      table.string('quest_title');
      table.string('quest_type');
      table.string('quest_level');
      table.string('quest_difficulty');
      table.string('quest_desc');
      table.string('quest_stages_total'); // how many stages in quest
      table.string('quest_stages'); // needs at least one stage.
   });
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('quests')
};
