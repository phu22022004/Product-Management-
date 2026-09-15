module.exports.priceNewProducts = (products) =>{
    const newProducts = products.map((item)=>{
    item.newPrice = (
      item.price -
      (item.price * item.discountPercentage) / 100
    ).toFixed(2);
    return item;
  });
  return newProducts;
}

module.exports.priceNewProduct = (product) =>{
    const priceNew = (
      (product.price * product.discountPercentage) / 100
    ).toFixed(0);
    return priceNew;
}