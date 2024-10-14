//[GET] /search
const Product = require('../../models/product.model');
const ProductHelper = require('../../helpers/product.js');
exports.index = async (req, res) => {
  const keyword = req.query.keyword;
  let find ={
    deleted : false,
  }
  if (keyword) {
    find.title = new RegExp(keyword, "i");
  } else{
    res.redirect(`/products`);
  }
  
  const products = await Product.find(find).sort({ position: "desc" });
  const newProducts = ProductHelper.newPrice(products);
    res.render("client/pages/search/index",{
      pageTitle: "Search",
      products: newProducts,
      keywords: keyword

    });
};