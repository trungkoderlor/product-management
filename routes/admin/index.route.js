const dashboardRoutes = require('./dashboard.route');
const systemconfig = require('../../config/system');
const productRoutes = require('./product.route');
const categoryRoutes = require('./category.route');
module.exports= (app)=>{
    PATH_ADMIN = systemconfig.prefixAdmin;
    app.use(PATH_ADMIN+ '/dashboard', dashboardRoutes);
    app.use(PATH_ADMIN+ '/products', productRoutes);
    app.use(PATH_ADMIN+ '/categories', categoryRoutes);
};

