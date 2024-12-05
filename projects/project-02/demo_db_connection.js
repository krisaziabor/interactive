import dotenv from 'dotenv';
import { createConnection } from 'mysql2';

dotenv.config({ path: 'private.env' });

var con = createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "kojoLEAGUE",
});

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

con.query('SELECT * FROM players', (err, results) => {
    if (err) {
        console.error('Error executing query', err);
        return;
    }

    console.log(results);
})