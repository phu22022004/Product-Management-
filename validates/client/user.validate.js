module.exports.registerPost = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Vui lòng nhập họ tên!");
    const referer = req.get("Referrer") || req.get("Referer");
    const redirectUrl = referer || req.baseUrl || "/user/register";
    res.redirect(redirectUrl);
    return;
  }
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email!");
    const referer = req.get("Referrer") || req.get("Referer");
    const redirectUrl = referer || req.baseUrl || "/user/register";
    res.redirect(redirectUrl);
    return;
  }
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu!");
    const referer = req.get("Referrer") || req.get("Referer");
    const redirectUrl = referer || req.baseUrl || "/user/register";
    res.redirect(redirectUrl);
    return;
  }
  next();
};

module.exports.loginPost = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email!");
    const referer = req.get("Referrer") || req.get("Referer");
    const redirectUrl = referer || req.baseUrl || "/user/login";
    res.redirect(redirectUrl);
    return;
  }
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu!");
    const referer = req.get("Referrer") || req.get("Referer");
    const redirectUrl = referer || req.baseUrl || "/user/login";
    res.redirect(redirectUrl);
    return;
  }
  next();
};

module.exports.forgotPasswordPost = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email!");
    const referer = req.get("Referrer") || req.get("Referer");
    const redirectUrl = referer || req.baseUrl || "/password/forgot";
    res.redirect(redirectUrl);
    return;
  }
  next();
};