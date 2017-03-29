/**
 * Created by jrfoxw on 2/18/17.
 */
import bookshelf  from '../bookshelf';
import User from './user'


export default bookshelf.Model.extend({
    tableName:'players',

    user: function(){
        return this.belongsTo(User)
    }
});
