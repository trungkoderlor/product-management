const RouteProducts = require("./product.route");
const RouteHome = require("./home.route");
const RouteAbout = require("./about.route");
const RouteSearch = require("./search.route");
const RouteCart = require("./cart.route");
const CategoryMiddleware = require("../../middlewares/client/category.middleware");
const CartMiddleware = require("../../middlewares/client/cart.middleware");
module.exports= (app)=>{
    app.use(CategoryMiddleware.category);
    app.use(CartMiddleware.cartId);
    app.use('/',RouteHome );
    app.use('/products', RouteProducts);
    app.use('/about', RouteAbout);
    app.use('/search', RouteSearch);
    app.use('/cart', RouteCart);
};

