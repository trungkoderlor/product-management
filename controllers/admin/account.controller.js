// [GET] /admin/accounts
const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const systemConfig = require('../../config/system');
const md5 = require('md5');
const express = require("express");
module.exports.index = async (req, res) => {
  let find = {
      deleted: false
  };
  const records = await Account.find(find).select("-password -token");
  for (const record of records) {
    const role = await Role.findOne({
      deleted: false,
      _id: record.role_id
    })
    record.role = role;
  }
  res.render("admin/pages/accounts/index",{
      pageTitle: "Trang Danh Sách Tài Khoản",
      records: records,
      expressFlash:
        {
            success: req.flash('success'),
            error: req.flash('error')

        }

  })
}
// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false
  };
  const roles = await Role.find(find);
  res.render("admin/pages/accounts/create",{
      pageTitle: "Trang Tạo Mới",
      roles: roles,
      expressFlash:
        {
            success: req.flash('success'),
            error: req.flash('error')

        }
  })
}
// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  const eamilExist = await Account.findOne({email: req.body.email, deleted: false});
  if(eamilExist){
    req.flash("error", `Email đã tồn tại !`);
    res.redirect('back');
    return;
  }
  req.body.password = md5(req.body.password);
  const record = new Account(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/accounts`);
}