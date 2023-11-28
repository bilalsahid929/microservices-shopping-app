export default (app) => {
  //   const service = new ShoppingService();
  app.use("/app-events", async (req, res, next) => {
    const { payload } = req.body;

    // Handle subscribe events
    // service.SubscribeEvents(payload);

    console.log("============= Product service receive event ================");
    console.log(payload);
    res.status(200).json(payload);
  });
};
