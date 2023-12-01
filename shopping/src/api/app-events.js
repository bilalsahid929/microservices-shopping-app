import ShoppingService from "../services/shopping-service.js";

export default (app) => {
  const service = new ShoppingService();
  app.use("/app-events", async (req, res, next) => {
    const { payload } = req.body;

    // Handle subscribe events
    service.SubscribeEvents(JSON.stringify(payload));

    console.log("============= Shopping ================");
    console.log(payload);
    res.json(payload);
  });
};
