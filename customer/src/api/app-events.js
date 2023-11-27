import CustomerService from "../services/customer-service.js";

export default (app) => {
  const service = new CustomerService();
  app.use("/app-events", async (req, res, next) => {
    const { payload } = req.body;

    // Handle subscribe events
    service.SubscribeEvents(payload);

    console.log("============= Shopping ================");
    console.log(payload);
    res.json(payload);
  });
};
