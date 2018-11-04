const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'oes',
    database: 'oes',
    password: 'nodecomplete'
});

module.exports = pool.promise();