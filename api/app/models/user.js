import bookshelf from '../bookshelf';
import Players from './player';

// const  Bookshelf  = ('../bookshelf.js');
// const  Players = ('./player');


export default bookshelf.Model.extend({
   tableName:'users',
   player: function() {
      return this.hasMany(Players)
   }
});



