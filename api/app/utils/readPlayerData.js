

const readPlayerData = (players, room) => {

 let playerFolder = this.playerFolder;
_.forEach(players, function(value,key){
//  console.log('Players: ',key,value)
  _.forEach(value, function(val, key){
      // Logger.e('Player: ', val, key);
      playerInfo = jsonfile.readFileSync(playerFolder+val.player.id+"_.json",'utf8');
      let p = playerInfo.player.loc;
      room[p.posX][p.posY] = playerInfo.playerData.number;
          
        })
    })
} 

export default readPlayerData;