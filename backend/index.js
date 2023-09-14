import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "R@nveer4u",
  database: "test",
});

app.use(express.json());
app.use(cors());

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to mySQL:", err);
    return;
  }
  console.log("Connected to MySQl");
});

app.get("/", (req, res) => {
  res.json("Hello this is backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  connection.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  connection.query(q, [values], (err,data) => {
    if (err) return res.json(err);
    return res.json("Book has been Created Successfully.");
  });
});

app.delete("/books/:id", (req,res)=> {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  connection.query(q, [bookId], (err, data) =>{
    if (err) return res.json(err);
    return res.json("Book has been deleted Successfully.");
  });
});

app.put("/books/:id", (req,res)=> {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover` = ? WHERE id = ?";

  const values =[
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,

  ];

  connection.query(q, [...values,bookId], (err, data) =>{
    if (err) return res.json(err);
    return res.json("Book has been updated Successfully.");
  });
});
app.listen(8800, () => {
  console.log("Connected to Backend!");
});
