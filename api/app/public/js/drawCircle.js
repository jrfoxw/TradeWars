/**
 * Created by PY-DEV on 2/27/2017.
 */
import 'node-easel';
import Canvas from 'canvas';
import fs from 'graceful-fs';
import _ from 'lodash';
// import Images from './public/images/DungeonImages'
//import door from "./public/images/door_r_32x32.png"
//import wall from './public/images/wallcorner32x32.jpg';
import floor from '/static/images/pixelfloor2specked32x32.jpg'

const drawCircle = () => {


const Stage = createjs.Stage;
const Shape = createjs.Shape;
const Graphics = createjs.Graphics;

let c = new Canvas(980, 580);
let ctx = c.getContext('2d');

let g = new createjs.Graphics();
let shape = new createjs.Shape(g);


  const  create_room_raw = () =>{
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
            room[x] = row.map((value, key) =>
                new createjs.Bitmap(floor)

            );
            // // next place wall tiles on top and bottom
            // if(x === 0 || x === height ){
            //     this.room[x] = row.map((value, key) =>
            //         <Image name="wall" key={`wall ${x} ${key}`} src={Images.wall} inline/>,
            //     );
            // }
            //
            // // next place wall tiles left and right
            // this.room[x][0] = <Image name="wall" key={`wall ${x},0`} src={Images.wall} inline/>;
            // this.room[x][width] = <Image name="wall" key={`wall ${x},${width}`} src={Images.wall} inline/>;



        }

        // Set player

        let grid_center = [Math.round(this.gridx/2), Math.round(this.gridy/2)];

        this.room[grid_center[0]][grid_center[1]] = this.player_avatar;


        // place gold
        // this.placeGold();

        // set player position and map into state
        // this.setState({player:{px:grid_center[0], py:grid_center[1]}});
        // this.setState({room:room});
        // console.log('Room State', this.room[2][5]);

    };



    // placeGold(){
    //     // Randomly place gold
    //     for(let goldDeposits = 0; goldDeposits<_.random(2,5); goldDeposits++){
    //         let posX = _.random(1,this.gridx-2);
    //         let posY = _.random(1,this.gridy-2);
    //
    //         console.log('PosX, PosY ',posX,posY);
    //         this.room[Math.round(posX)][Math.round(posY)] =
    //             <Image name="gold"
    //                    key={"gold"+shortU.uuid()}
    //                    src={Images.hidden}
    //                    width="32"
    //                    height="32"
    //                    inline
    //             />
    //     }

    // }

g.setStrokeStyle(8)
    .beginStroke("#F0F")
    .beginRadialGradientFill(["#FF0", "#00F"], [0, 1], 100, 200, 0, 100, 200, 40)
    .drawCircle(100, 200, 40);

let stage = new createjs.Stage(c);
stage.addChild(shape);
stage.addChild(room);
stage.update();

fs.writeFile(__dirname + '/public/circle.png', c.toBuffer(), function () {
    createjs.Ticker.halt();
});

    console.log('Circle Completed..')
};

export default drawCircle();
