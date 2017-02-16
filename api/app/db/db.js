/**
 * Created by PY-DEV on 2/15/2017.
 */
const knex =  require('knex')({

    client: 'postgres',
    connection: {

        host        :       'localhost',
        port        :       '5432',
        user        :       'admin',
        password    :       'test',
        database    :       'twars',
        charset     :       'utf8'
    }
});



export default knex;