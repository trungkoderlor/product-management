// [GET] /products
const Product = require('../../models/product.model');
const Category = require('../../models/category.model');
const ProductHelper = require('../../helpers/product.js');
const CategoryHelper = require('../../helpers/category.js');
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: 'active',
        deleted: false,

    }).sort({ position: "desc" });
    const newProducts = ProductHelper.newPrice(products);
    res.render('client/pages/products/index', {
        pageTitle: "Trang sản phẩm",
        products: newProducts
    });
}
// [GET] /products/:slug
module.exports.detail = async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug, deleted: false });
    if (product.category_id){
        const category = await Category.findOne({ _id: product.category_id ,status:"active",deleted:false});
        product.category= category;
    }
    product.priceNew = ProductHelper.newPriceOne(product);
    res.render('client/pages/products/detail', {
        pageTitle: product.title,
        product: product
    });
}
// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
    const category = await Category.findOne({ slug: req.params.slugCategory ,deleted:false});
   
    let subs = await CategoryHelper.getSubCategory(category.id);  
    console.log(subs);
    const find = {
        deleted: false,
        category_id: {
            $in:[category.id,...subs.map(sub=>sub.id)]
        },
        status: "active"
    }
    const products = await Product.find(find).sort({ position: "desc" });
    const newProducts = ProductHelper.newPrice(products);
    try {
        res.render('client/pages/products/index', {
            pageTitle: category.title,
            products: newProducts
        });
    }
    catch (error) {
        req.flash("error", `không tìm thấy sản phẩm`);
        res.redirect(`/products`);
    }
}