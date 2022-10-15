require("dotenv").config();

const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(bodyParser.raw());

const db = mysql.createPool({
  host: `${process.env.MYSQL_HOST}`,
  user: `${process.env.MYSQL_USER}`,
  password: `${process.env.MYSQL_PASSWORD}`,
  database: `${process.env.MYSQL_DATABASE}`,
});

app.get("/", (req, res) => {
  const sqlSelect = "SELECT * FROM Persons";
  db.query(sqlSelect, (err, result) => {
    //res.send({id: "HELLO"});
    res.send(result);
  });

  //res.send("hello world");
});

app.post("/insert", (req, res) => {
  const sqlInsert = "INSERT INTO Persons (LastName) VALUES (?)";
  //db.query(sqlInsert, ["sample"], (err, result) => {});
  console.log(req.body);
});

app.listen(3000);
