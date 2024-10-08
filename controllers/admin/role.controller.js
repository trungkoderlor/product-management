const Role = require("../../models/role.model");
const systemConfig = require('../../config/system');
//[GET] /admin/roles
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  };
  const records = await Role.find(find);
  res.render("admin/pages/roles/index", {
    pageTitle: "Nhóm Quyền",
    records : records
  });
};
//[GET] /admin/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Tạo mới nhóm quyền"
  });
};
//[POST] /admin/create
module.exports.createPost = async (req, res) => {
  const record = new Role(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};
//[GET] /admin/edit/:id
module.exports.edit = async (req, res) => {
  try{
    const id = req.params.id;
  const find = {
    deleted: false,
    _id: id
  }
  const record = await Role.findOne(find);
  res.render("admin/pages/roles/edit", {
    pageTitle: "Chỉnh sửa nhóm quyền",
    record: record
  });
  }
  catch(err){
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};
//[PATCH] /admin/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  await Role.updateOne({ _id: id }, req.body);
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};
//[GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
  let find ={
    deleted: false
  }
  const records = await Role.find(find);
  res.render("admin/pages/roles/permission", {
    pageTitle: "Phân quyền",
    records : records
  });
};
//[PACTH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  const permissions = JSON.parse(req.body.permissions);
  for (const permission of permissions) {
    await Role.updateOne({ _id: permission.id }, { permissions: permission.permissions });
  }
  res.redirect('back');
};
