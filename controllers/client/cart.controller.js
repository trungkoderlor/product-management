//[GET] /cart
const Cart = require('../../models/cart.model');
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;
  let cart = await Cart.findOne({ _id: cartId });
  res.render('client/pages/cart/index', {
    pageTitle: "Giỏ hàng",
    cart: cart
  });
  };
//[POST] /cart/add/:id

module.exports.addPost = async (req, res) => {
  const productId = req.params.id;
  let quantity = parseInt(req.body.quantity);
  const cartId = req.cookies.cartId;
  const cart = await Cart.findOne({ _id: cartId });
  const existProduct = cart.products.find(product => product.product_id == productId);
  if (existProduct) {
    quantity +=  existProduct.quantity;
    await Cart.updateOne
    (
        { _id: cartId, 'products.product_id': productId },
        { $set: { 'products.$.quantity': quantity } }
    );
  } else {  
    const objectCart ={
      product_id:productId,
      quantity:quantity
  }
  await Cart.updateOne
  (
      { _id: cartId },
      { $push: { products: objectCart } }
  );
  
}
res.redirect('/cart');
}