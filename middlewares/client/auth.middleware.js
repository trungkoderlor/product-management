
const User = require("../../../../../vscode/learn_backend/product-management/models/user.model");
module.exports.requireAuth = async (req, res, next) => { 
  if(!req.cookies.tokenUser){
    return res.redirect(`/user/login`);
  }else{
    const user= await User.findOne({tokenUser: req.cookies.tokenUser}).select('-password');
    if(!user){
      return res.redirect(`/user/login`);
    }else{
      res.locals.user = user;
      next();
    }
    
  }
  
}