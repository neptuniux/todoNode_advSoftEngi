
const { Pool } = require('pg');

const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: '0_todoNode',
        password: 'root',
        port: 5432,
});

pool.on('connect', () => {
    console.log('Database connected successfully');
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
