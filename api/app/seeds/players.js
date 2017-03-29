/**
 * Created by jrfoxw on 2/18/17.
 */
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('players').del()
        .then(function () {
            return Promise.all([
                // Inserts seed entries
                knex('players').insert({id: 1,
                    player_name: 'Dwarf',
                    player_class: 'Warrior',
                    player_avatar: 'http://www.free-avatars.com/data/media/47/Ken.gif',
                    password_digest: '1234',
                    player_att: 5,
                    player_def: 8,
                    player_hp: 10,
                    player_bio: "Character story data",
                    player_level: 1,
                    player_quests: "wip",
                    player_inv: "knife, hat"


                })

            ]);
        });
};