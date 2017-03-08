/**
 * Created by jrfoxw on 2/14/17.
 */
import knex from 'knex';
import bookshelf from 'bookshelf';
import knexConfig from './knexfile';

export default bookshelf(knex(knexConfig.development));

