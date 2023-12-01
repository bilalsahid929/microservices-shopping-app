import ShoppingService from "../services/shopping-service.js";
import UserAuth from "./middlewares/auth.js";
import { PublishCustomerEvent } from "../utils/index.js";

export default (app) => {
  const service = new ShoppingService();

  app.post("/order", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { txnNumber } = req.body;

    try {
      const { data } = await service.PlaceOrder({ _id, txnNumber });
      const payload = await service.GetOrderPayload(_id, data, "CREATE_ORDER");
      PublishCustomerEvent(payload);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/orders", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    try {
      const { data } = await service.GetOrders(_id);

      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/cart", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const { data } = await service.GetCart({ _id });
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });
};
