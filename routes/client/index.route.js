const RouteProducts = require("./product.route");
const RouteHome = require("./home.route");
const RouteAbout = require("./about.route");
const RouteSearch = require("./search.route");
const RouteCart = require("./cart.route");
const RouteCheckout = require("./checkout.route");
const RouteUser = require("./user.route");
const RouteChat = require("./chat.route");
const CategoryMiddleware = require("../../middlewares/client/category.middleware");
const CartMiddleware = require("../../middlewares/client/cart.middleware");
const UserMiddleware = require("../../middlewares/client/user.middleware");
const SettingMiddleware = require("../../middlewares/client/setting.middleware");
module.exports= (app)=>{
    app.use(CategoryMiddleware.category);
    app.use(CartMiddleware.cartId);
    app.use(UserMiddleware.infoUser);
    app.use(SettingMiddleware.settingGeneral);
    app.use('/',RouteHome );
    app.use('/products', RouteProducts);
    app.use('/about', RouteAbout);
    app.use('/search', RouteSearch);
    app.use('/cart', RouteCart);
    app.use('/checkout', RouteCheckout);
    app.use('/user', RouteUser);
    app.use('/chat', RouteChat);
};

