require('dotenv').config()

const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
const port = parseInt(process.env.APP_PORT ?? "5000", 10);

const bcrypt = require('bcrypt');
const saltRounds = 10;

const { validateRegister } = require("./validators/registerValidator");

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

// TODO error handling: check if username already exists
// TODO input check Joi

app.get("/users", (req, res) => {
    db
        .query("SELECT id, username FROM users")
        .then(([users]) => {
            res.json(users);
        })
        .catch(((err) => {
            res.status(500).send("Error while retrieving data from database.");
        }))
})

app.post("/register", validateRegister, async (req, res) => {
    const { username, password } = req.body;

    const hashPassword = (plainPassword, options) => {
        return bcrypt.hash(plainPassword, options);
    };

    const hashedPassword = await hashPassword(password, saltRounds);
    db
        .query(
            "INSERT INTO users (username, password) VALUES (?,?)",
            [username, hashedPassword],
        )
        .then((result) => {
            const rows = result[0].affectedRows;
            res.status(200).send(`User has been successfully created, affected rows: ${rows}.`);
        })
        .catch(((err) => {
            // console.error(err);
            res.status(500).send("Error while creating user.");
        }))
});

app.listen(port, (err) => {
    if (err) {
        console.error("Something bad happened.");
    } else {
        console.log("The Server is listening on the port that has been defined in your env file.");
    }
});