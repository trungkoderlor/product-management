// [GET] /admin/dashboard
const Category = require('../../models/category.model');
const Product = require('../../models/product.model');
const Account = require('../../models/account.model');
const User = require('../../models/user.model');
module.exports.dashboard = async (req, res) => {
    
    const statistics = {
        categories: {
            total: 0,
            active: 0,
            inactive: 0
        },
        products: {
            total: 0,
            active: 0,
            inactive: 0
        },
        accounts: {
            total: 0,
            active: 0,
            inactive: 0
        },
        users: {
            total: 0,
            active: 0,
            inactive: 0
        }
    }
    await Category.find()
        .then(categories => {
            statistics.categories.total = categories.length;
            statistics.categories.active = categories.filter(category => category.status === "active").length;
            statistics.categories.inactive = categories.filter(category => category.status === "inactive").length;
        })
    await Product.find()
        .then(products => {
            statistics.products.total = products.length;
            statistics.products.active = products.filter(product => product.status === "active").length;
            statistics.products.inactive = products.filter(product => product.status === "inactive").length;
        })
    await Account.find()
        .then(accounts => {
            statistics.accounts.total = accounts.length;
            statistics.accounts.active = accounts.filter(account => account.status === "active").length;
            statistics.accounts.inactive = accounts.filter(account => account.status === "inactive").length;
        })   
    await User.find()
        .then(users => {
            statistics.users.total = users.length;
            statistics.users.active = users.filter(user => user.status === "active").length;
            statistics.users.inactive = users.filter(user => user.status === "inactive").length;})
    res.render("admin/pages/dashboard/index", {
        pageTitle: "Trang Tổng Quan",
        statistics: statistics

    })
}