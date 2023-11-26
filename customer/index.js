import express, { json } from "express";

const app = express();

app.use(json());

app.use("/", (req, res, next) => {
  return res.status(200).json({ msg: "Hello from Customer" });
});

app.listen(8001, () => {
  console.log("Customer is Listening to Port 8001");
});
