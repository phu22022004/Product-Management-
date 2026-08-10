module.exports.loginPost = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email!");
    const referer = req.get("Referrer") || req.get("Referer");
    const redirectUrl = referer || req.baseUrl || "/admin/auth/login";
    res.redirect(redirectUrl);
    return;
  }
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu!");
    const referer = req.get("Referrer") || req.get("Referer");
    const redirectUrl = referer || req.baseUrl || "/admin/auth/login";
    res.redirect(redirectUrl);
    return;
  }

  next();
};
