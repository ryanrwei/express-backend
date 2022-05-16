import express from "express";
// import bodyParser from "body-parser";
// app.use(bodyParser.json()); 
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

app.use(express.json()); // 用這個 前端 Post/發送東西到後端server的時候，終端才有辦法顯示

// app.get("/", (req, res) => {
//   res.send("hello ryan");
// });

app.get("/getUser", async (req, res) => {
  await client.connect();

  const customer = await client.query("SELECT * FROM customer");
  console.log(customer.rows)
  res.send(customer.rows)
});

app.post("/addOrder", async (req, res) => {
  await client.connect();

  // const { room_id, breakfast, deposit, final_payment, checkin_date, checkout_date, costomer_amount, add_bed, watera_ctivity,
  // pet, bbq, note = "", costomer_id, name, phone_number } = req.body;

  const { room_id, breakfast, deposit, final_payment, checkin_date, checkout_date, costomer_amount, add_bed, watera_ctivity,
    pet, bbq, note = "", name, phone_number } = req.body;

    // console.log(name)

    const sql = `INSERT INTO customer (customer.name, phone_number) VALUES (${name}, ${phone_number});`

    console.log("sql>>>",sql)
    const newOrder = await client.query(sql);
    // console.log(newOrder)

    // const sql = 
    // `with first_insert as (
    //   insert into customer(customer.name, phone_number) 
    //   values(${name},${phone_number}) 
    //   RETURNING id
    // )
    // insert into orders 
    //   (room_id, breakfast, deposit, final_payment, checkin_date, checkout_date, costomer_amount, 
    //   add_bed, watera_ctivity, pet, bbq, note, costomer_id) 
    // values 
    //   ( ${room_id}, ${breakfast}, ${deposit}, ${final_payment}, to_timestamp(${new Date(checkin_date)/1000}),
    //   to_timestamp(${new Date(checkout_date)/1000}), ${costomer_amount}, 
    //   ${add_bed}, ${watera_ctivity}, ${pet}, ${bbq}, (select id from first_insert));`

  // const sql = `INSERT INTO orders 
  // ( room_id, breakfast, deposit, final_payment, checkin_date, checkout_date, 
  // costomer_amount, add_bed, watera_ctivity, pet, bbq, costomer_id) 
  // VALUES (${room_id}, ${breakfast}, ${deposit}, ${final_payment}, to_timestamp(${new Date(checkin_date)/1000}),
  // to_timestamp(${new Date(checkout_date)/1000}), ${costomer_amount}, ${add_bed}, ${watera_ctivity}, ${pet}, ${bbq}, ${costomer_id});`


  // console.log(newOrder.rows)
  // const newcustomer = await client.query(`INSERT INTO customer ( name, phone_number) VALUES (${name}, ${phone_number});`);

  // res.send(newOrder.rows)
});


// app.post("/addOrder", async (req, res) => {
//   await client.connect();

//   const { room_id, breakfast, deposit, final_payment, checkin_date, checkout_date, costomer_amount, add_bed, watera_ctivity,
//   pet, bbq, note = "", costomer_id, name, phone_number } = req.body;

//   const sql = `INSERT INTO orders 
//   ( room_id, breakfast, deposit, final_payment, checkin_date, checkout_date, 
//   costomer_amount, add_bed, watera_ctivity, pet, bbq, costomer_id) 
//   VALUES (${room_id}, ${breakfast}, ${deposit}, ${final_payment}, to_timestamp(${new Date(checkin_date)/1000}),
//   to_timestamp(${new Date(checkout_date)/1000}), ${costomer_amount}, ${add_bed}, ${watera_ctivity}, ${pet}, ${bbq}, ${costomer_id});`

//   // console.log("sql>>>",sql)
//   const newOrder = await client.query(sql);
//   // console.log(newOrder)
//   console.log(newOrder.rows)
//   // const newcustomer = await client.query(`INSERT INTO customer ( name, phone_number) VALUES (${name}, ${phone_number});`);

//   // res.send(newOrder.rows)
// });


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
