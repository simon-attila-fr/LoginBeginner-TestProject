require('dotenv').config()

const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = parseInt(process.env.APP_PORT ?? "5000", 10);

app.use(express.json());

console.log(process.env.DB_HOST);

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

db
    .getConnection()
    .then(() => {
        console.log("DB connection is okay.")
    })
    .catch((err) => {
        console.error(err);
    })

app.listen(port, (err) => {
    if (err) {
      console.error("Something bad happened.");
    } else {
      console.log("The Server is listening on the port that has been defined in your env file.");
    }
  });