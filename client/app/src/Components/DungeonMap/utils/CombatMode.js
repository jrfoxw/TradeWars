/**
 * Created by jrfoxw on 2/25/17.
 */
import React, { Component } from 'react';



class CombatMode extends Component {
    constructor(props) {
        super(props)

    }

    mobCombat() {
        damageRoll = _.random(1, this.currentMob.attacker.att);
        block = this.props.def;
        damage = damageRoll - block;
        this.props.hp -= damage;
        wonRoll = this.currentMob.attacker.name;
        mobNumber = <span style={{
            fontSize: "32px",
            color: 'red',
            backgroundColor: 'white',
            display: 'inline'
        }}>{this.currentMob.attacker.hp}</span>;
        playNumber =
            <span style={{fontSize: "32px", color: 'green', backgroundColor: 'white'}}>{this.props.hp}</span>;
    }



    playerCombat(){
        damageRoll = _.random(1, this.props.att);
        block = this.currentMob.attacker.def;
        damage = damageRoll - block;
        this.currentMob.attacker.hp -= damage;
        wonRoll = 'Player';
        playNumber = <span style={{
            fontSize: "32px",
            color: 'red',
            backgroundColor: 'white',
            display: 'inline'
        }}>{this.props.hp}</span>;
        mobNumber = <span style={{
            fontSize: "32px",
            color: 'green',
            backgroundColor: 'white'
        }}>{this.currentMob.attacker.hp}</span>;

    }
    }


    // roll initiative
    render(){
        
        let mobRoll = _.random(1,20);
        let playerRoll = _.random(1,20)+this.props.dex;
        let mobNumber = 0;
        let playNumber = 0;
        let wonRoll = 0;
        let damageRoll = 0;
        let damage = 0;
        let block = 0;

        attacking ?
            this.mobCombat()





            flash(<div> {wonRoll} Attacks {damageRoll} - {block}: Doing {damage} points of
                damage! {playNumber} {this.player_avatar} vs <Image src={this.currentMob.attacker.image}
                                                                    inline/> {mobNumber} </div>);
            console.log('Trying to enable buttons.. ', this.props);
            this.setprops({attack: false, defense: false});

        } else {
            this.playerAttack();
        }
        
        return(
            
            <div>
                
            </div>
        )
    }
    
    
    

}

export default CombatMode;