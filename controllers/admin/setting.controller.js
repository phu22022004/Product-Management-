const SettingGeneral = require("../../models/settings-general.model");
const systemConfig = require("../../config/system.js");

// [GET]/settings/general
module.exports.general = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne({});
  res.render("admin/pages/settings/general.pug", {
    pageTitlte: "Cài đặt chung",
    settingGeneral: settingGeneral,
  });
};

// [PATCH]/settings/general
module.exports.generalPatch = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne({});
  if (settingGeneral) {
    await SettingGeneral.updateOne(
      {
        _id: settingGeneral.id,
      },
      req.body,
    );
  } else {
    const record = new SettingGeneral(req.body);
    await record.save();
  }
  req.flash("success", "Cập nhật thành công");
  const referer = req.get("Referrer") || req.get("Referer");
  const redirectUrl =
    referer || req.baseUrl || `${systemConfig.prefixAdmin}/settings/general`;

  res.redirect(redirectUrl);
};
