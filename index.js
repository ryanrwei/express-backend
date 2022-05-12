import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const { Client } = pg;
const app = express();
const port = 8000;
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "85315",
  port: 5432,
});

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json

app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("hello ryan");
// });

app.get("/getUser", async (req, res) => {
  await client.connect();

  const customer = await client.query("SELECT * FROM customer");
  res.send(customer.rows)
});


// app.post("/newUser", (req, res) => {
//   console.log(req.body);
//   //   const email = req.body.email;
//   //   const password = req.body.password;
//   const { email, password } = req.body;
//   console.log(email);
//   console.log(password);
//   // save to db
//   res.send(`create user successfully and its email is: ${email}`);
// });

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
