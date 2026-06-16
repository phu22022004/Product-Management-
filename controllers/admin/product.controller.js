const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helper/filter-status.js");
const searchHelper = require("../../helper/search.js");
const paginationHelper = require("../../helper/pagination.js");
// [GET] /admin/products
module.exports.index = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);

  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  // Pagination
  const countProducts = await Product.countDocuments(find);
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 3,
    },
    req.query,
    countProducts,
  );
  // End pagination

  const products = await Product.find(find)
    .sort({ position: "desc" })
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
  res.render("admin/pages/product/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};
// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status });

  const referer = req.get("Referrer") || req.get("Referer");
  const redirectUrl = referer || req.baseUrl || "/admin/products";

  res.redirect(redirectUrl);
};
// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      break;

    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      break;

    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() },
      );
      break;

    case "change-position":
      for (const items of ids) {
        let [id, position] = items.split("-");
        await Product.updateOne({ _id: id }, { position: position });
      }

      break;

    default:
      break;
  }
  const referer = req.get("Referrer") || req.get("Referer");
  const redirectUrl = referer || req.baseUrl || "/admin/products";

  res.redirect(redirectUrl);
};

// [DELETE] /admin/products/delete/:id (Xóa vĩnh viễn và xóa mềm)
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  // await Product.deleteOne({ _id: id }); // Xóa vĩnh viễn
  await Product.updateOne(
    { _id: id },
    { deleted: true, deletedAt: new Date() },
  ); //xóa mềm

  const referer = req.get("Referrer") || req.get("Referer");
  const redirectUrl = referer || req.baseUrl || "/admin/products";

  res.redirect(redirectUrl);
};
