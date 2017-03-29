/**
 * Created by PY-DEV on 2/27/2017.
 */


// Quick snippet for rogue like room

function createRandomMapRoom(){
    let newMap = []
    let gridX = Math.floor(Math.random()*6)+3
    let gridY = Math.floor(Math.random()*6)+3
    console.log(gridX,gridY)

    for(let x=0; x<=gridX; x++){

        x == 0 || x === gridX ? newMap.push(["#","#","#","#"]) : newMap.push(["#",".",".","#"])

    }

    console.log('New Map: ',newMap)
}


function drawMap(){
    let amap = []
    let ed = [
        ["#","#","#","#","#","#","#","#"],
        ["#",".",".",".",".",".",".","#"],
        ["#",".",".",".",".",".",".","#"],
        ["#",".",".",".",".",".",".","#"],
        ["#",".",".",".",".",".",".","#"],
        ["#","#","#","#","#","#","#","#"]
    ]

    let move = ed.map((x,y) => {amap.push(x)} )
    return amap;
}



function movePlayer(x,y){
    let room = drawMap();
    room[x][y] = "@"
    for(let y in room)
        console.log('r',room[y])
}

