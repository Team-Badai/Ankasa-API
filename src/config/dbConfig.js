const mysql = require('mysql2')

const connection = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
    // host : '34.232.44.145',
    // user : 'fazz3juan',
    // password : 'juantoFazz1234#',
    // database : 'fazz3juan_ankasa'
})

console.log(process.env.DB_PASSWORD)

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});

module.exports = connection