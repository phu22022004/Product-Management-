module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", "Vui lòng nhập tiêu đề!");
    const referer = req.get("Referrer") || req.get("Referer");
    const redirectUrl = referer || req.baseUrl || "/admin/products";
    res.redirect(redirectUrl);
    return;
  }
  next();
};
