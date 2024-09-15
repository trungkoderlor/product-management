// [GET] /products
const Product = require('../../models/product.model');
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: 'active',
        deleted: false,
        
    }).sort({position:"desc"});
    const newProducts = products.map(item =>{
        item.priceNew= (item.price*(100-item.discountPercentage)/100).toFixed(2);
        return item;
    }) 
    res.render('client/pages/products/index',{
        pageTitle: "Trang sản phẩm",
        products: newProducts
    });
}
// [GET] /products/:slug
module.exports.detail = async (req, res) => {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }
        const product = await Product.findOne(find);
    try {
        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            expressFlash: {
                success: req.flash('success'),
                error: req.flash('error')
            },
            product: product
        });
    }
    catch (error) {
        req.flash("error", `không tìm thấy sản phẩm`);
        res.redirect(`/products`);
    }
}