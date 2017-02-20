
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('items', function(table){
        table.increments('id');

        // Basic stats
        table.string('item_id');
        table.string('item_name');
        table.string('item_type'); // Weapon,Armor,Potion,Ring,Amulet,etc
        table.string('item_element'); // Nature,Fire,Wind,Water,Air,Dark,Light
        table.string('item_level');
        table.string('item_class_specific');
        table.string('item_desc');
        table.string('item_weight');
        table.string('item_goes_ivn_slot');

        // Combat stats
        table.string('item_attack_damage');
        table.string('item_defense_level');
        table.string('item_magic_damage');
        table.string('item_chance_of_spell_fizzle');

        // Booleans
        table.boolean('item_is_magical');
        table.boolean('item_does_protect');
        table.boolean('item_does_damage');
        table.boolean('item_does_heal');



    });

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('items')
};


