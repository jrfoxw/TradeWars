
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('users', function(table){
        table.increments('id');
        table.string('user_name').notNullable().unique();
        table.string('user_email').notNullable().unique();
        table.string('user_avatar');
        table.string('password_digest').notNullable();
        table.timestamps();
    }).
    createTableIfNotExists('players', function(table){
        table.increments('id');
        table.integer('user_id').references('users.id');
        table.string('player_name').notNullable().unique();
        table.string('player_avatar');
        table.string('player_class').notNullable();
        table.string('player_level').notNullable();
        table.string('player_bio');
        table.string('player_hp');
        table.string('player_mp');
        table.string('player_att');
        table.string('player_def');
        table.string('player_inv');
        table.json('player_quests',{'total':1
                                   ,'completed':0
                                   ,'progress':0
                                   ,'quests':
                                        {'quest_id':{}
                                        ,'quest_status':'new'
                                        ,'quest_prog':'started'
                                        }});

        table.string('password_digest').notNullable();
        table.timestamps()


    }).
    alterTable('players', function(table){
        table.string('player_mp');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('players')
      .dropTableIfExists('users')
};
