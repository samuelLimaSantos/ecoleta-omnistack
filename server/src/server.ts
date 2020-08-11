import express from "express";

const app = express();

app.get("/users", (req, res) => {
  return res.json({ message: "Hello My friend" });
});

app.listen(3333);
