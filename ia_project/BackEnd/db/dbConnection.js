const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project',
    port: '3307',
});

connection.connect((err)=>{
    if(err){
        console.error("connection error");
        return;
    }
    console.log("Connected to mysql");
});

module.exports = connection;