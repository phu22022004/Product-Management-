const md5 = require("md5");
const User = require("../../models/user.model");
// [GET] /user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register",{
        pageTitle:"Đăng kì tài khoản",
    });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
    const existEmail = await User.findOne({
        email:req.body.email,
        deleted:false,
    })
    if(existEmail){
        req.flash("error", "Email đã tồn tại!");
        const referer = req.get("Referrer") || req.get("Referer");
        const redirectUrl = referer || req.baseUrl || "/user/register";
        res.redirect(redirectUrl);
    }
    req.body.password = md5(req.body.password)
    const user = new User(req.body);
    await user.save();
    res.cookie("tokenUser",user.tokenUser);
    res.redirect("/");
};