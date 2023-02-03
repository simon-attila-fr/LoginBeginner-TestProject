require("dotenv").config();

const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
const port = parseInt(process.env.APP_PORT ?? "5000", 10);

const jwt = require("jsonwebtoken");

// Password hashing
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Validators and verificators
const { validateRegister } = require("./validators/registerValidator");
const { verifyAdminJWT } = require("./auth/auth");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.getConnection()
  .then(() => {
    console.log("DB connection is okay.");
  })
  .catch((err) => {
    console.error(err);
  });

app.post("/register", validateRegister, (req, res) => {
  const { email, username, password } = req.body;
  const hashPassword = (plainPassword, options) => {
    return bcrypt.hash(plainPassword, options);
  };

  db.query("SELECT * FROM users WHERE email = ?;", email).then(
    async ([result]) => {
      if (result.length > 0) {
        res
          .status(409)
          .json({ message: "Error while creating a user." });
      } else {
        const hashedPassword = await hashPassword(password, saltRounds);
        db.query(
          "INSERT INTO users (email, username, password, isadmin) VALUES (?,?,?,?)",
          [email, username, hashedPassword, "0"]
        )
          .then((result) => {
            const rows = result[0].affectedRows;
            res.status(200).json({
              message: `User has been successfully created, affected rows: ${rows}.`,
            });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Error while creating a user." });
          });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?;", email)
    .then(async (result) => {
      const comparaisonResult =
        result[0].length > 0
          ? await bcrypt.compare(password, result[0][0].password)
          : false;
      if (comparaisonResult) {
        const payload = { id: result[0][0].id, isadmin: result[0][0].isadmin };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .send({
            user: result[0][0].username,
            message: `Welcome ${result[0][0].username}!`,
          });
      } else {
        res.status(401).send("Wrong credentials.");
      }
    })
    .catch((err) => {
      res.status(500).send("Something went wrong.");
    });
});

app.get("/logout", (req, res) => {
  return res.clearCookie("access_token").sendStatus(204);
});

// ---- Protected routes ADMIN ----
app.use(verifyAdminJWT);

app.get("/api/users", (req, res) => {
  db.query("SELECT id, username FROM users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).send("Error while retrieving data from database.");
    });
});

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened.");
  } else {
    console.log(
      "The Server is listening on the port that has been defined in your env file."
    );
  }
});
