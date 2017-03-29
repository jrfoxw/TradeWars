/**
 *  Encounter.js
 *  checks for encounters
 *
 *
 **/
import _ from 'lodash'
import CreatureImage from '../images/DungeonImages'




/**
 * Roll for encounter
 * @param {number} chance - determines number to beat
 * @param {number} playerLevel - players current level [default=1]
 * @param {Array} playerMods - optional - modifications from player abilities(sneak,hide,etc)
 *
 * **/

const Encounter = (chance, playerLevel=1, playerMods=1) =>{

    const creatures = {

        'goblin':
        {
            name: "goblin",
            image: CreatureImage.goblin,
            att: 2,
            toHit:4,
            def:1,
            hp: 10,
        },

        'rat':
        {
            name:"rat",
            image: CreatureImage.rat,
            att: 1,
            toHit:2,
            def:1,
            hp: 4,
        },

        'wolf':
        {
            name:'wolf',
            image: CreatureImage.wolf,
            att: 3,
            toHit:3,
            def:1,
            hp: 15,
        },
        'snake':
        {
            name:'snake',
            image: CreatureImage.snake2,
            att: 1,
            toHit:2,
            def:1,
            hp: 5,
            special: 'poison'
        }

};

    // Roll for encounter
    // chance determines percentage

    let isEncounter;
    const roll = _.random(1,99) - playerMods;
    roll >= 100 - chance ?  isEncounter = true: isEncounter = false;

    // If there is an encounter roll for attacker and level
    if(isEncounter){


        let mobs = (Object.keys(creatures));
        let r = _.random(0,mobs.length);
        let attacker = mobs[r];

        console.log('Attacker',attacker, r);
        let attacker_level = _.random(1,playerLevel+1);
        let attacker_data = {
                            attacker:creatures[attacker],
                            chance: roll,
                            type:creatures[attacker].name,
                            level:attacker_level,
                            msg:`A ${creatures[attacker].name} attacks you!`
                            };
        return attacker_data;

    }
};

export default Encounter;




