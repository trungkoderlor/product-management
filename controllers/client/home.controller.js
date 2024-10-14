const Product = require('../../models/product.model');
const ProductHelper = require('../../helpers/product.js');
// [GET] /
module.exports.index = async (req, res) => {
    const productsFetured = await Product.find({
        deleted: false,
        status: 'active',
        featured:"1"
    }).limit(8).sort({position:"desc"});
    const productsNew = await Product.find({
        deleted: false,
        status: 'active',
        
    }).limit(8).sort({position:"desc"});
    const newProductsFetured =ProductHelper.newPrice(productsFetured);
    const newProductsNew =ProductHelper.newPrice(productsNew);
    res.render('client/pages/home/index',{
        pageTitle: "Trang chủ",
        productsFetured: newProductsFetured,
        productsNew: newProductsNew
 
    });
}