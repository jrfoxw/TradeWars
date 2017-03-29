import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Button, Icon, Form, Grid, Container, Image, Label, Dimmer, Loader, Segment, Menu} from 'semantic-ui-react';
import Images from './images/DungeonImages'
import _ from 'lodash';
import shortU from 'short-uuid';
import { addMessage, getMessage, delMessage } from '../../Actions/flashActions'
// import flash from '/utils/flashMessage';
import PlayerStatus from './PlayerStatus';
import MobStatus from './MobStatus';
import Encounter from './utils/encounter';
import axios from 'axios';
import io from 'socket.io-client';

let socket = io('http://192.168.1.130:3005');



class DungeonMap extends Component{
    constructor(props){
        super(props);
        this.state = {
                        currentRoom:null,
                        room:[],
                        room64:null,
                        pos:0,
                        player:{px:5,py:5},
                        flash:{color:"white",msg:"Click a direction to begin.."},
                        history:[],
                        isLoading: true,
                        attack: true,
                        defense: true,
                        flee: true,
                        att: 4,
                        def: 1,
                        hp: 30,
                        dex: 10,
                        attacking: false,
                        mobsLoc:{}


        };



        // room defaults..
        this.room = [];
        this.grid_size = {'gridx':0,'gridy':0};
        this.gridx = 0;
        this.gridy = 0;


        // combat status
        this.combat = false;
        this.mobsLoc = {};


        //creature
        this.currentMob = {attacker:{image:<Image/>,att:0,def:0,hp:0}};

        // Objects

        this.impassable = ['wall'];

        // player
        this.player_avatar = <Image key={"player_"+shortU.uuid()} src={this.props.user.user.avatar} width="32" height="31" inline bordered/>;
        this.player = {
                       stats:{att:2,def:1,hp:30}
                      ,inventory:{right:'copper dagger',left:'wooden buckler',belt:'cheese'}
                      ,currency:{gold:0,silver:0,gems:0}};

        //bindings
        this.movePlayerSprite = this.movePlayerSprite.bind(this);
        this.playerAttack = this.playerAttack.bind(this);
        this.playerDefend = this.playerDefend.bind(this);
        this.playerFlee = this.playerFlee.bind(this);
        this.playerInventory = this.playerInventory.bind(this);



        this.messageHistory = [];


        // this.dungeonImage = new Image();

    }


    componentWillMount(){
        this.setState({ isLoading: false });
        this.set_room();

    }

    componentDidMount(){
        console.log('Flash: ',this.props.flash.message);
        socket.emit('connection',{data: "buzz"})

        socket.on('connection',(data) =>{
          console.debug('Connected to Server..')
        })
        socket.on('move' ,(data) =>{
          console.debug('Data recieved from server.. ',data.data)
          this.setState({currentRoom:null})
          this.setState({currentRoom:data.data})

          // this.showTestRoom()
        })
        this.create_room_raw();


        // this.drawPlayerSprite(Math.round(this.gridx/2), Math.round(this.gridy/2));
        this.showRoom();
    }


    get_room(){
      axios.get("http://192.168.1.130:3001/api/dungeon/")
      .then((res) =>{
        console.debug('Recieved image data..',res)
        this.setState({room64: res})
      })
      .catch((err) =>{
        console.debug('No data recieved..')
      })
    }



    set_room(){
      this.setState({currentRoom:"http://192.168.1.130:3001/gamefiles/map/dungeon/game_map.png"})
    }

    moveRight(){

      console.log("RIGHT");
      socket.emit('move',{
        msg: "Moving "+socket.id+" Right",
        dir: [0,+1],
        id:socket.id,

      });




      // createjs.Sound.play(audioPath+'stepSound.mp3')
    }

    moveLeft(){

      console.log("RIGHT");
      socket.emit('move',{
        msg: "Moving "+socket.id+" Right",
        dir: [0,-1],
        id:socket.id,
      });


      // createjs.Sound.play(audioPath+'stepSound.mp3')
    }




    create_room_raw(){
        let room = [];
        let min_size = 7;
        let max_size = 9;
        this.room_value +=1;
        let sizexy = 9;
        let width = sizexy;
        let height = sizexy;
        this.grid_size = {"gridx":_.range(0,width),"gridy":_.range(0,height)};
        let gridx = this.grid_size.gridx.length;
        let gridy = this.grid_size.gridy.length;
        this.gridx = gridx;
        this.gridy = gridy;


        // Create arrays of 2 dimensional room
        this.room =  _.fill(Array(height), []);
        let row = _.fill(Array(width), Images.floor);
        console.log("Empty Room: ",this.room);


        // First fill entire room with floor tiles
        for(let x=0; x<=height; x++){
            this.room[x] = row.map((value, key) =>
                         <Image name="hidden" key={`hidden ${x},${key}`} src={Images.hidden} inline/>

             );
            // next place wall tiles on top and bottom
            if(x === 0 || x === height ){
                this.room[x] = row.map((value, key) =>
                    <Image name="wall" key={`wall ${x} ${key}`} src={Images.wall} inline/>,
                );
            }

            // next place wall tiles left and right
            this.room[x][0] = <Image name="wall" key={`wall ${x},0`} src={Images.wall} inline/>;
            this.room[x][width] = <Image name="wall" key={`wall ${x},${width}`} src={Images.wall} inline/>;



        }

        // Set player

        let grid_center = [Math.round(this.gridx/2), Math.round(this.gridy/2)];

        this.room[grid_center[0]][grid_center[1]] = this.player_avatar;


        // place gold
        this.placeGold();

        // set player position and map into state
        this.setState({player:{px:grid_center[0], py:grid_center[1]}});
        this.setState({room:room});
        console.log('Room State', this.room[2][5]);

    };



    placeGold(){
        // Randomly place gold
        for(let goldDeposits = 0; goldDeposits<_.random(2,5); goldDeposits++){
            let posX = _.random(1,this.gridx-2);
            let posY = _.random(1,this.gridy-2);

            console.log('PosX, PosY ',posX,posY);
            this.room[Math.round(posX)][Math.round(posY)] =
                <Image name="gold"
                       key={"gold"+shortU.uuid()}
                       src={Images.hidden}
                       width="32"
                       height="32"
                       inline
                />
        }

    }


    procMessages(color, message){
        let text = message;
        this.setState({flash:{color:color,msg:text}});
        this.setState({history:[...this.state.history, text]});
        const id = shortU.uuid();
        let tMessage ={
            id: id,
            text: text
        };

        this.props.addMessage({
            color: color,
            message: tMessage,
            history: this.state.history,

        });
    }


    // Collision Detection
    collDetect(pdir){

        let { px, py } = this.state.player;
        const roomData = this.room;

        const pxM1 = roomData[px-1][py];
        const pxP1 = roomData[px+1][py];
        const pyP1 = roomData[px][py+1];
        const pyM1 = roomData[px][py-1];

        if(this.combat){
            this.procMessages("gold","You are currently in combat and must either Attack, Defend or Flee");
            return false;
        }

        // found gold
        if(pdir.props.name === "gold"){
            console.log('Found gold!!');
            this.foundGold();

            return true;
        }

        if(pdir.props.name === "wall"){
            console.log('Moving toward wall..');

            this.procMessages("white","A moss covered wall blocks your path..");


            pdir === pxM1 ? px++ : null;
            pdir === pxP1 ? px-- : null;
            pdir === pyP1 ? py-- : null;
            pdir === pyM1 ? py++ : null;

            this.room[px][py] = this.player_avatar;
            this.setState({player: {px: px, py: py}});
            return false;
        } else {
            return true;
        }

    }



    foundGold(creature){
        let gold = _.random(5, 15);
        if(!creature) {

            this.procMessages("orange",`Found ${gold} pieces of Gold!`);
            // flash(message);
            this.player.currency.gold += gold;
            }else{
                this.procMessages("blue",`The ${creature} dropped {gold} pieces of gold!`)
            }
        }


    mobAttack() {

        let damageRoll = 0;
        let damage = 0;
        let block = 0;
        let toHit = _.random(1, 10);
        let {att, def, name} = this.currentMob.attacker;

        damageRoll = _.random(1, this.currentMob.attacker.att);
        block = this.state.def;
        damage = damageRoll - block;
        this.setState({hp: this.state.hp -= damage});

        this.procMessages("red",`The ${name} attacks you!`);
        if (toHit > 6) {
            // roll damage
            damageRoll = _.random(1, att);
            block = this.player.stats.def;
            damage = damageRoll - block;
            this.setState({hp: this.state.hp -= damage});
            if (this.state.hp >= 0 || damage > 0) {

                this.procMessages("red",`You take ${damage} points of damage!` )

            }else{
                this.procMessages("white",`The ${name} hits,  but you absorb all ${damageRoll} points of damage!`)
            }
        } else {
            this.procMessages("red",`Your deflect the ${name}'s attack!`)
        }
    }

    playerAttack(event){

        let damageRoll = 0;
        let damage = 0;
        let block = 0;

        let { name, hp } = this.currentMob.attacker;

        // Roll player attack
        let toHit = _.random(1,10)+1;

        // Does toHit beat mobs toHit?
        if(toHit > this.currentMob.attacker.toHit){
            // roll damage
            damageRoll = _.random(1, this.state.att);
            block = this.currentMob.attacker.def;
            damage = damageRoll - block;
            hp = this.currentMob.attacker.hp -= damage;
            if(hp>=0) {
                this.procMessages("red",`${name} takes ${damage} points of damage! HP:${hp}`);
                this.room[this.state.mobsLoc.loc[0]][this.state.mobsLoc.loc[1]] =
                    <Image src={Images.hit} inline/>;
                    this.setState({room: this.room});
                    setTimeout(() => {
                        this.room[this.state.mobsLoc.loc[0]][this.state.mobsLoc.loc[1]] =
                            <Image key={shortU.uuid()} src={this.currentMob.attacker.image} inline />;
                        this.setState({ room: this.room});
                        this.mobAttack();

                    }, 300);
                }else{
                this.procMessages("orange",`${name} has died!`);
                    this.room[this.state.mobsLoc.loc[0]][this.state.mobsLoc.loc[1]] = <Image key={shortU.uuid()} src={Images.remains} inline/>
                    setTimeout(() =>{
                        this.combat = false;
                        this.procMessages("orange", `searching remains...`);
                        this.state.attack = true;
                        this.state.defense = true;
                    },3000);

                    setTimeout(() =>{this.foundGold()},5000)
                }


        }else {
            this.procMessages("red",`Your attack deflects of the ${name}'s hardened skin!`);
            setTimeout(() =>{
                this.mobAttack()
            },2000);

        }
    }

    playerDefend(event){
        this.procMessages("green", `You attempt to defend yourself..`)
    }

    playerFlee(event){
        this.procMessages("yellow", `You try to run away..`)
    }

    playerInventory(event){
        let pi = this.player.inventory;
        // const stuff = [pi.map((v,k) => <span key={k}>{v}</span>)];
        console.log("Player Stuff ",pi);
        const stuff = _.map(pi,(value, key) =>
            <div style={{ color: "white"}} key={key}>{key} : {value}</div>);
        this.procMessages("blue",`You are currently carrying..${stuff}`);
    }

    movePlayerSprite(event) {

        let {px, py} = this.state.player;
        this.state.flash ? this.setState({flash: ""}) : this.state.flash;
        const roomData = this.room;
        const pxM1 = roomData[px - 1][py];
        const pxP1 = roomData[px + 1][py];
        const pyP1 = roomData[px][py + 1];
        const pyM1 = roomData[px][py - 1];

        // Roll Encounter Check
        let result = Encounter(30);

        // If there is no encounter, player is not in combat && there is an event handler...
        if (!result && event && !this.combat) {
            this.room[px][py] = <Image inline key={shortU.uuid()} src={Images.floor} width="32" height="32"/>;

            console.log("Event: ", event.target.name);
            let dir = event.target.name;


            if (dir == "up" && this.collDetect(pxM1)) {

                this.room[px - 1][py] = this.player_avatar;
                this.setState({player: {px: px - 1, py: py}});
            }

            if (dir == "down" && this.collDetect(pxP1)) {

                this.room[px + 1][py] = this.player_avatar;
                this.setState({player: {px: px + 1, py: py}});
            }


            if (dir == "left" && this.collDetect(pyM1)) {
                this.room[px][py - 1] = this.player_avatar;
                this.setState({player: {px: px, py: py - 1}});

            }


            if (dir == "right" && this.collDetect(pyP1)) {

                this.room[px][py + 1] = this.player_avatar;
                this.setState({player: {px: px, py: py + 1}});
            }
        }

        // Check for encounter

        if (result && !this.combat) {
            let mobImage = <Image key={"mob" + shortU.uuid()} src={result.attacker.image} inline/>;
            if (this.room[px - 1][py].props.name != 'wall') {
                this.room[px - 1][py] = mobImage;
                this.setState({mobsLoc:{mob: mobImage, loc: [px - 1, py]}});
            }
            else if (this.room[px + 1][py].props.name != 'wall') {
                this.room[px + 1][py] = mobImage;
                this.setState({mobsLoc:{mob: mobImage, loc: [px + 1, py]}});
            }


            else if (this.room[px][py - 1].props.name != 'wall') {
                this.room[px][py - 1] = mobImage;
                this.setState({mobsLoc:{mob: mobImage, loc: [px, py - 1]}});

            }

            else if (this.room[px][py + 1].props.name != 'wall') {
                this.room[px][py + 1] = mobImage;
                this.setState({mobsLoc:{mob: mobImage, loc: [px, py + 1]}});

            }

            // flash(result.msg);
            this.currentMob = result;

            this.combat = true;
            this.combatMode()
        }
        console.log('Encounter Results: ', result);

            this.setState({room: this.room});

    }


    combatMode(){
        // roll initiative
       let mobRoll = _.random(1,20);
       let playerRoll = _.random(1,20)+this.state.dex;
       let mobNumber = 0;
       let playNumber = 0;
       let wonRoll = 0;
       let damageRoll = 0;
       let damage = 0;
       let block = 0;
       if(!this.state.attacking) {
           if (mobRoll >= playerRoll) {
               damageRoll = _.random(1, this.currentMob.attacker.att);
               block = this.state.def;
               damage = damageRoll - block;
               this.state.hp -= damage;
               wonRoll = this.currentMob.attacker.name;
               mobNumber = <span style={{
                   fontSize: "32px",
                   color: 'red',
                   backgroundColor: 'white',
                   display: 'inline'
               }}>{this.currentMob.attacker.hp}</span>;
               playNumber =
                   <span style={{fontSize: "32px", color: 'green', backgroundColor: 'white'}}>{this.state.hp}</span>;


           } else {
               damageRoll = _.random(1, this.state.att);
               block = this.currentMob.attacker.def;
               damage = damageRoll - block;
               this.currentMob.attacker.hp -= damage;
               wonRoll = 'Player';
               playNumber = <span style={{
                   fontSize: "32px",
                   color: 'red',
                   backgroundColor: 'white',
                   display: 'inline'
               }}>{this.state.hp}</span>;
               mobNumber = <span style={{
                   fontSize: "32px",
                   color: 'green',
                   backgroundColor: 'white'
               }}>{this.currentMob.attacker.hp}</span>;

           }

           this.procMessages("red",`${wonRoll} Attacks ${damageRoll} - ${block}: Doing ${damage} points of
               damage! ${playNumber}  vs  ${mobNumber}`);
           console.log('Trying to enable buttons.. ', this.props);
           this.setState({attack: false, defense: false});

       } else {
           this.playerAttack();
       }

    }

    showRoom(){
        return this.room.map((value, key) => <div key={key}>{value}</div>)
    }

    showTestRoom(){



      // this.dungeonImage.src = 'data:image/png;base64,'+this.state.room64
      // console.log('Room64: ',this.dungeonImage.src)
      return (<div><img alt='test' src={this.state.currentRoom}/></div>)
    }


    LoaderWait(){

        const dat =
            <Segment loading color={"white"} centered>
            <Dimmer active>
                <Loader  active />
            </Dimmer>
            </Segment>
        ;

        return dat


    }


    render(){
        const { isLoading } = this.state;

        if(isLoading) {
            return (
                <Grid centered>
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <div style={{ backgroundColor:"black",height:"400px",width:"400px" }}>
                            {this.LoaderWait()}
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            )
        }
        return(


            <Grid centered>

              <Grid.Row>
                <PlayerStatus user={this.props.user.user} att={this.state.att} def={this.state.def} hp={this.state.hp}/>

                <Grid.Column width="8">

                  <div style={{border:"2px solid gray",
                                     backgroundColor:"black",
                                     color:this.state.flash.color,
                                     padding:"10px",
                                     height:"84px",
                                     fontSize:"18px",
                  }} >
                    {this.state.flash.msg}
                  </div>
                </Grid.Column>

                <MobStatus creature={ this.currentMob } />

              </Grid.Row>
              <Grid.Row>

                <Grid.Column width={6} offset={2} color="black">
                  <Container>

                    Dungeon
                    <div>
                      <Label>Gems: {this.player.currency.gems}</Label>
                      <Label>Silver: {this.player.currency.silver}</Label>
                      <Label>Gold: {this.player.currency.gold}</Label>
                      {/* {this.showRoom()} */}
                      {this.showTestRoom()}
                    </div>
                    <Button name="left" onClick={this.moveLeft}>left</Button>
                    <Button name="right" onClick={this.moveRight}>Right</Button>
                         <Button name="up" onClick={this.movePlayerSprite}>up</Button>
                         <Button name="down" onClick={this.movePlayerSprite}>down</Button>

                        </Container>

                    </Grid.Column>
                    <Grid.Column width={5} color="black">

                            <Container textAlign="left">

                            <Menu  inverted vertical>
                                <Menu.Item name="Attack">
                                    <Button name='attack' color="red" disabled={this.state.attack} onClick={this.playerAttack}>ATT</Button>
                                    <Label color="red">{this.player.inventory.right}</Label>
                                </Menu.Item>
                                <Menu.Item name="Defend">
                                    <Button
                                        name ='defend'
                                        color="green"
                                        disabled={this.state.defense}
                                        onClick={this.playerDefend}>DEF</Button>
                                    <Label color="green">{this.player.inventory.left}</Label>
                                </Menu.Item>
                                <Menu.Item name="Flee">
                                    <Button name='flee' color="yellow" disabled={this.state.flee} onClick={this.playerFlee}>RUN</Button>
                                    <Label color="yellow">wait</Label>

                                </Menu.Item>
                                <Menu.Item name="inventory">
                                    <Button color="blue" onClick={this.playerInventory}>Inventory</Button>
                                    <Label color="blue">2lbs</Label>

                                </Menu.Item>
                            </Menu>
                            </Container>


                    </Grid.Column>
                </Grid.Row>
            </Grid>


        )
    }


}

function mapStateToProps(state){
    return{
        user: state.Auth,
        flash: state.FlashMessage,
    }
}

export default connect(mapStateToProps, { getMessage, delMessage, addMessage })(DungeonMap);
