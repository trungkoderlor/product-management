const RouteProducts = require("./product.route");
const RouteHome = require("./home.route");
const RouteAbout = require("./about.route");
module.exports= (app)=>{
    app.use('/',RouteHome );
    app.use('/products', RouteProducts);
    app.use('/about', RouteAbout);
};

