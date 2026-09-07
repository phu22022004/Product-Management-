const categoryMiddleware = require("../../middlewares/client/category.middleware");
const ProductRoutes = require("./product.route");
const HomeRoutes = require("./home.route");
module.exports = (app) => {
  app.use(categoryMiddleware.category)
  app.use("/", HomeRoutes);
  app.use("/products",ProductRoutes);
};
