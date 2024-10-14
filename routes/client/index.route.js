const RouteProducts = require("./product.route");
const RouteHome = require("./home.route");
const RouteAbout = require("./about.route");
const RouteSearch = require("./search.route");
const CategoryMiddleware = require("../../middlewares/client/category.middleware");
module.exports= (app)=>{
    app.use(CategoryMiddleware.category);
    app.use('/',RouteHome );
    app.use('/products', RouteProducts);
    app.use('/about', RouteAbout);
    app.use('/search', RouteSearch);
};

