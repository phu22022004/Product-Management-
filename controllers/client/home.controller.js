const Product = require("../../models/product.model");
const productsHelper = require("../../helper/products")

// [GET] /
module.exports.index = async (req, res) => {
  //Lấy sản phẩm nổi bật
  const productsFeatured = await Product.find({
    featured:"1",
    deleted: false,
    status: "active"
  }).limit(6);
  const newProductsFeature = productsHelper.priceNewProducts(productsFeatured);
  //Hết Lấy sản phẩm nổi bật
  const productNew = await Product.find({
    deleted: false,
    status: "active"
  }).sort({position:"desc"}).limit(6);
  const newProductsNew = productsHelper.priceNewProducts(productNew);

  //Hết Hiển thị sản pẩm mới nhất
  res.render("client/pages/home/index.pug", {
    pageTitle: "Trang chủ",
    productsFeatured: newProductsFeature ,
    productsNew:newProductsNew,
  });
};
