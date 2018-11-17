const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'oes',
    database: 'oes',
    password: '1234'
});

module.exports = pool.promise();