const dashboardRoutes = require('./dashboard.route');
const systemconfig = require('../../config/system');
const productRoutes = require('./product.route');
const categoryRoutes = require('./category.route');
const roleRoutes = require('./role.route');
const accountRoutes = require('./account.route');
const authRoutes = require('./auth.route');
const myaccountRoutes = require('./my-account.route');
const settingRoutes = require('./setting.route');
const authMiddleware = require('../../middlewares/admin/auth.middleware');
module.exports= (app)=>{
    PATH_ADMIN = systemconfig.prefixAdmin;
    app.use(PATH_ADMIN+ '/dashboard',
        authMiddleware.requireAuth,
         dashboardRoutes);
    app.use(PATH_ADMIN+ '/products',authMiddleware.requireAuth, productRoutes);
    app.use(PATH_ADMIN+ '/categories',authMiddleware.requireAuth, categoryRoutes);
    app.use(PATH_ADMIN+ '/roles',authMiddleware.requireAuth, roleRoutes);
    app.use(PATH_ADMIN+ '/accounts',authMiddleware.requireAuth, accountRoutes);
    app.use(PATH_ADMIN+ '/auth', authRoutes);
    app.use(PATH_ADMIN+ '/my-account',authMiddleware.requireAuth, myaccountRoutes);
    app.use(PATH_ADMIN+ '/settings',authMiddleware.requireAuth, settingRoutes);
};

