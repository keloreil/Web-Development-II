// event_db.js
const mysql = require('mysql2');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          
  password: '1121',      
  database: 'charityevents_db'
});


db.connect(err => {
  if (err) {
    console.error(' Database connection failed: ', err);
  } else {
    console.log(' Database connection successful');
  }
});


module.exports = db;
