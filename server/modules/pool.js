const pg = require('pg');
const Pool = pg.Pool;

const config = {
    database: 'todo_list',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
};

const pool = new Pool(config);

pool.on('connect', () => {
    console.log('Todo list connected');
})


pool.on('error', (error) => {
    console.log('Todo list NOT connected', error);
})

module.exports = pool;