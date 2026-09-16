const Cart = require("../../models/cart.model")

module.exports.cartId = async (req,res,next)=>{
    //khi chưa có giỏ hàng
    if(!req.cookies.cartId){
        const cart = new Cart();
        await cart.save();
        const expiresTime = 1000 * 60 * 60 * 24 * 365;
        console.log(expiresTime);
        res.cookie("cartId",cart.id,{
            expires: new Date(Date.now() + expiresTime)
        });
    }else{
        //khi đã có giỏ hàng
    }
    next();
}