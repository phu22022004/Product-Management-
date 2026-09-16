const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");

const ProductRoutes = require("./product.route");
const HomeRoutes = require("./home.route");
const searchRoutes = require("./search.route");
const cartRoutes = require("./cart.route");
module.exports = (app) => {
  app.use(categoryMiddleware.category)
  app.use(cartMiddleware.cartId)
  app.use("/", HomeRoutes);
  app.use("/products",ProductRoutes);
  app.use("/search",searchRoutes);
  app.use("/cart",cartRoutes);
};
