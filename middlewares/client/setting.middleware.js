
const SettingGeneral = require("../../../../../vscode/learn_backend/product-management/models/settings-general.model");
module.exports.settingGeneral = async (req, res, next) => {
  const settingGeneral = await SettingGeneral.findOne({});
  res.locals.settingGeneral = settingGeneral; 
  next();
};