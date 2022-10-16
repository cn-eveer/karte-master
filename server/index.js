require("dotenv").config();

const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createPool({
  host: `${process.env.MYSQL_HOST}`,
  user: `${process.env.MYSQL_USER}`,
  password: `${process.env.MYSQL_PASSWORD}`,
  database: `${process.env.MYSQL_DATABASE}`,
});

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("HELLO WORLD");
});

app.get("/user", (req, res) => {
  if (req.query.user_id === undefined) res.status(400);
  const user_id = req.query.user_id;
  const sqlSelect = `SELECT * FROM users WHERE user_id = ${user_id}`;
  db.query(sqlSelect, (err, result) => {
    res.send(result[0]);
  });
});

app.get("/cartes", (req, res) => {
  if (req.query.user_id === undefined) res.status(400);
  const user_id = req.query.user_id;
  const sqlSelect = `SELECT * FROM cartes WHERE user_id = ${user_id} ORDER BY carte_id DESC`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/user", (req, res) => {
  const name = req.body.name;
  const furigana = req.body.furigana;
  const age = req.body.age;
  const sex = req.body.sex;
  const birthdate = new Date(req.body.birthdate);
  const sqlInsert =
    "INSERT INTO users(name,furigana,age,sex,birthdate) VALUES (?,?,?,?,?)";
  db.query(sqlInsert, [name, furigana, age, sex, birthdate], (err, result) => {
    res.send(result);
  }).catch((error) => {
    res.send(error);
  });
});

app.post("/carte", (req, res) => {
  const user_id = req.body.user_id;
  const subjective = req.body.Subjective;
  const objective = JSON.stringify(req.body.Objective);
  const assessment = req.body.Assessment;
  const plan = req.body.Plan;
  const date = new Date();
  console.log([user_id, subjective, objective, assessment, plan, date]);
  const sqlInsert =
    "INSERT INTO cartes(user_id,subjective,objective,assessment,plan,date) VALUES (?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [user_id, subjective, objective, assessment, plan, date],
    (err, result) => {
      res.send(result);
    }
  );
});

app.get("/templates", (req, res) => {
  const sqlSelect = "SELECT * FROM templates";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.listen(3001);
