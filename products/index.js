import express, { json } from "express";

const app = express();

app.use(json());

app.use("/", (req, res, next) => {
  return res.status(200).json({ msg: "Hello from Products" });
});

app.listen(8002, () => {
  console.log("Product is Listening to Port 8002");
});
