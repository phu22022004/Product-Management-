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

// [GET]/admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    let find = {
      _id: id,
      deleted: false,
    };
    const data = await Role.findOne(find);

    res.render("admin/pages/roles/edit", {
      pageTitlte: "Sửa nhóm quyền",
      data: data,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};

// [PATCH]/admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  console.log(req.body);
  try {
    const id = req.params.id;

    await Role.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật nhóm quyền thành công!");
  } catch (error) {
    req.flash("error", "Cập nhật nhóm quyền thất bại!");
  }
  const referer = req.get("Referrer") || req.get("Referer");
  const redirectUrl =
    referer || req.baseUrl || `${systemConfig.prefixAdmin}/roles`;

  res.redirect(redirectUrl);
};

// [GET]/admin/roles/permissions
module.exports.permissions = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);
  res.render("admin/pages/roles/permissions.pug", {
    pageTitlte: "Phân quyền",
    records: records,
  });
};

// [PATCH]/admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  console.log(req.body);
  const permissions = JSON.parse(req.body.permissions);
  for (const item of permissions) {
    await Role.updateOne({ _id: item.id }, { permission: item.permissions });
  }
  req.flash("success", "Cập nhật phân quyền thành công!");

  const referer = req.get("Referrer") || req.get("Referer");
  const redirectUrl =
    referer || req.baseUrl || `${systemConfig.prefixAdmin}/roles/permissions`;

  res.redirect(redirectUrl);
};
