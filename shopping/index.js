import express, { json } from "express";

const app = express();

app.use(json());

app.use("/", (req, res, next) => {
  return res.status(200).json({ msg: "Hello from Shopping" });
});

app.listen(8003, () => {
  console.log("Shopping is Listening to Port 8003");
});
