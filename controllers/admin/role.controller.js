const Role = require("../../models/roles.model");
const systemConfig = require("../../config/system.js");

// [GET]/admin/roles
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);
  res.render("admin/pages/roles/index.pug", {
    pageTitlte: "Nhóm quyền",
    records: records,
  });
};

// [GET]/admin/roles/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create.pug", {
    pageTitlte: "Tạo nhóm quyền",
  });
};

// [POST]/admin/roles/create
module.exports.createPost = async (req, res) => {
  const record = new Role(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};
