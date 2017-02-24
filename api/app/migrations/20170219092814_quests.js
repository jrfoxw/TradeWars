
exports.up = function(knex, Promise) {
   return knex.schema.createTableIfNotExists('quests', function(table){
      table.increments('id');
      table.string('quest_id');
      table.string('quest_title');
      table.string('quest_image');
      table.string('quest_type');
      table.boolean('quest_repeat').defaultTo('true');
      table.string('quest_level').defaultTo(1);
      table.string('quest_difficulty').defaultTo('easy');
      table.string('quest_desc');
      table.string('quest_stages_total'); // how many stages in quest
      table.string('quest_stages'); // needs at least 3 stages.
   });
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('quests')
};
