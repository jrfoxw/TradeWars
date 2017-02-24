import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Button, Icon, Form, Grid, Container, Image, Label, Dimmer, Loader, Segment, Menu} from 'semantic-ui-react';
import Images from './images/DungeonImages'
import _ from 'lodash';
import shortU from 'short-uuid'
import Encounter from './utils/encounter'


class DungeonMap extends Component{
    constructor(props){
        super(props);
        this.state = {
                        room:[],
                        pos:0,
                        player:{px:5,py:5},
                        flash:"Click a direction to begin..",
                        isLoading: true,
                        attack: true,
                        defense: true,
                        flee: true,

        };
        this.room = [];
        this.gridValue = 0;
        this.map_grid_data = {};
        this.map_grid_loc = [8,8];
        this.grid_data = {};
        this.room_value = 99;
        this.grid_size = {'gridx':0,'gridy':0};
        this.gridx = 0;
        this.gridy = 0;
        this.combat = false;

        // Objects
        // this.wall = <Image  src={wall} inline/>;
        this.floor = <Image  src={Images.floor} inline/>;
        this.player_avatar = <Image key={"player_"+shortU.uuid()} src={this.props.user.user.avatar} width="32" height="31" inline bordered/>;
        // this.gold = <Image name="gold" key={"gold"+shortU.uuid()} src={goldChest} width="32" height="32" inline/>
        this.impassable = ['wall'];

        // player
        this.player = {inventory:{right:'copper dagger',left:'wooden buckler',belt:'cheese'}
                      ,currency:{gold:0,silver:0,gems:0}};

        //bindings
        this.movePlayerSprite = this.movePlayerSprite.bind(this);
        this.playerAttack = this.playerAttack.bind(this);
        this.playerDefend = this.playerDefend.bind(this);
        this.playerFlee = this.playerFlee.bind(this);
        this.playerInventory = this.playerInventory.bind(this);


        this.messageHistory = [];

    }




    componentWillMount(){
        this.setState({ isLoading: false });

    }

    componentDidMount(){
        this.create_room_raw();
        this.drawPlayerSprite(Math.round(this.gridx/2), Math.round(this.gridy/2));
        this.showRoom();
    }

    // grid2 = a => { return a.map((_, c) => a.map(r => console.log([c])))};


    // componentDidUpdate(){
    //     this.scrollToBottom();
    // }


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

        // place gold


        // this.room[1][1] = <Image name="gold" key={"gold"+shortU.uuid()} src={Images.hidden} width="32" height="32" inline/>;

        this.placeGold();


        this.setState({player:{px:5, py:5}});
        this.setState({room:room});
        console.log('Room State', this.room[2][5]);

        // return this.room.map((value, key) => <div style={{ fontFamily:"monospace"}} key={key}>{value}</div>)


    };


    redrawRoom(){



    }

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


    flashMessage(message){


        this.messageHistory.push(message);
        this.setState({flash: message})
    }


    collDetect(pdir){

        let { px, py } = this.state.player;
        const roomData = this.room;

        const pxM1 = roomData[px-1][py];
        const pxP1 = roomData[px+1][py];
        const pyP1 = roomData[px][py+1];
        const pyM1 = roomData[px][py-1];

        if(this.combat){
            this.flashMessage("You are currently in combat mode and must either Attack, Defend or Flee");
            return false;
        }

        // found gold
        if(pdir.props.name === "gold"){
            console.log('Found gold!!');
            let gold = _.random(5,15);
            let message = <div style={{ color:"orange" }}>Found {gold} pieces of Gold!</div>;
            this.flashMessage(message);
            this.player.inventory.gold+= gold;

            return true;
        }

        if(pdir.props.name === "wall"){
            console.log('Moving toward wall..');
            this.flashMessage(<div>A moss covered wall blocks your path..</div>);
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


    drawPlayerSprite(px, py) {
        console.log('Player',px,py);
        this.room[px][py] = this.player_avatar;
        this.setState({player: {px: px, py: py }});
        this.setState({room: this.room});
        console.log("Room in state", this.state.room);
    }


    playerAttack(event){
        this.flashMessage(<div style={{ color: "yellow" }}>You swing wildly..</div>)
    }

    playerDefend(event){
        this.flashMessage(<div style={{ color: "green" }}>You attempt to defend yourself..</div>)
    }

    playerFlee(event){
        this.flashMessage(<div style={{ color: "yellow" }}>You try to run away..</div>)
    }

    playerInventory(event){
        let pi = this.player.inventory;
        // const stuff = [pi.map((v,k) => <span key={k}>{v}</span>)];
        console.log("Player Stuff ",pi);
        const stuff = _.map(pi,(value, key) =>
            <div style={{ color: "white"}} key={key}>{key} : {value}</div>);
        this.flashMessage(<div style={{ color: "blue" }}>You are currently carrying..{stuff}</div>)
    }

    movePlayerSprite(event){

        let {px, py} = this.state.player;
        this.state.flash ? this.setState({flash:""}) : this.state.flash;
        const roomData = this.room;
        const pxM1 = roomData[px-1][py];
        const pxP1 = roomData[px+1][py];
        const pyP1 = roomData[px][py+1];
        const pyM1 = roomData[px][py-1];



        if(event) {
            this.room[px][py] = this.floor;

            console.log("Event: ", event.target.name);
            let dir = event.target.name;


            if(dir == "up" && this.collDetect(pxM1)){

                this.room[px-1][py] = this.player_avatar;
                this.setState( { player: { px: px-1, py: py } } );
            }

            if(dir == "down" && this.collDetect(pxP1)){

                this.room[px+1][py] = this.player_avatar;
                this.setState( { player: { px: px+1, py: py } } );
            }


            if(dir == "left" && this.collDetect(pyM1)) {
                    this.room[px][py - 1] = this.player_avatar;
                    this.setState({player: {px: px, py: py - 1}});

            }


            if(dir == "right" && this.collDetect(pyP1)){

                this.room[px][py+1] = this.player_avatar;
                this.setState( { player: { px: px, py: py + 1 } } );
            }


            // Check for encounter
            let result = Encounter(30);
            if(result && !this.combat) {
                let mobImage = <Image key={"mob"+shortU.uuid()} src={result.attacker.image} inline/>;
                if(this.room[px-1][py].props.name != 'wall')
                    this.room[px-1][py] = mobImage;
                else if(this.room[px+1][py].props.name !='wall')
                    this.room[px+1][py] = mobImage;
                else if(this.room[px][py-1].props.name !='wall')
                    this.room[px][py-1] = mobImage;
                else if(this.room[px][py+1].props.name !='wall')
                    this.room[px][py+1] = mobImage;

                this.flashMessage(result.msg);
                this.combat = true;
                this.playerCombat()
            }
            console.log('Encounter Results: ',result);

            this.setState({room: this.room});
            // this.setState( { player: { px: px, py: py } } );
            // console.log("Player Moved: ",this.state.room);
            // this.drawPlayerSprite()
        }

    }


    playerCombat(){

        console.log('Trying to enable buttons.. ',this.props);
        this.setState({attack:false,defense:false});
        


    }

    showRoom(){
        return this.room.map((value, key) => <div key={key}>{value}</div>)
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

                    <Grid.Column width="8">

                        <div style={{border:"2px solid gray",
                                     backgroundColor:"black",
                                     color:"white",
                                     padding:"10px",
                                     height:"84px",
                                     fontSize:"18px",
                                     }} >
                            {this.state.flash}
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>

                    <Grid.Column width={6} offset={2} color="black">
                        <Container>

                            Dungeon
                            <div>
                                <Label>Gems: {this.player.inventory.gems}</Label>
                                <Label>Silver: {this.player.inventory.silver}</Label>
                                <Label>Gold: {this.player.inventory.gold}</Label>
                                {this.showRoom()}
                            </div>
                         <Button name="left" onClick={this.movePlayerSprite}>left</Button>
                         <Button name="right" onClick={this.movePlayerSprite}>Right</Button>
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
    }
}

export default connect(mapStateToProps)(DungeonMap);