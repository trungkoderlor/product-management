const dashboardRoutes = require('./dashboard.route');
const systemconfig = require('../../config/system');
const productRoutes = require('./product.route');
module.exports= (app)=>{
    PATH_ADMIN = systemconfig.prefixAdmin;
    app.use(PATH_ADMIN+ '/dashboard', dashboardRoutes);
    app.use(PATH_ADMIN+ '/products', productRoutes);
};

