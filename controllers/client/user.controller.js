const User = require('../../models/user.model');
const md5 = require('md5');
const generateHelper = require('../../helpers/generate');
const ForgotPassword = require('../../models/forgot-password.model');
//[GET]/user/register
module.exports.register =async (req, res) => {
    res.render("client/pages/user/register",{
        pageTittle: "Đăng ký tài khoản",
        expressFlash:
        {
            success: req.flash('success'),
            error: req.flash('error')

        }
    });
}

//[POST]/user/register
module.exports.registerPost =async (req, res) => {
  const existEmail = await User.findOne({email: req.body.email});
  if(existEmail){
      req.flash('error', 'Email đã tồn tại');
      res.redirect('back');
      return;
      }
  req.body.password =md5(req.body.password);
  const user = new User(req.body);
  await user.save();
  res.cookie("tokenUser",user.tokenUser);
  res.redirect('/');
}
//[GET]/user/login
module.exports.login =async (req, res) => {
    res.render("client/pages/user/login",{
        pageTittle: "Đăng nhập",
        expressFlash:
        {
            success: req.flash('success'),
            error: req.flash('error')

        }
    });
}
//[POST]/user/login
module.exports.loginPost =async (req, res) => {
  const {email,password} = req.body;
  const user = await User.findOne({
    email: email,
    deleted :false
  })
  if(!user){
    req.flash('error', 'Tài khoản không tồn tại');
    res.redirect('back');
    return;
  }
  if(user.password !== md5(password)){
    req.flash('error', 'Mật khẩu không chính xác');
    res.redirect('back');
    return;
  }
  if(user.status === 'inactive'){
    req.flash('error', 'Tài khoản chưa được kích hoạt');
    res.redirect('back');
    return;
  }
  res.cookie("tokenUser",user.tokenUser);
  res.redirect('/');

}
//[GET]/user/logout
module.exports.logout =async (req, res) => {
  res.clearCookie('tokenUser');
  res.redirect('/user/login');
}
//[GET]/user/password/forgot
module.exports.forgotPassword =async (req, res) => {
    res.render("client/pages/user/forgot-password",{
        pageTittle: "Quên mật khẩu",
        expressFlash:
        {
            success: req.flash('success'),
            error: req.flash('error')

        }
    });
}
//[POST]/user/password/forgot
module.exports.forgotPasswordPost =async (req, res) => {
  const user = await User.findOne({email: req.body.email,deleted :false});
  if(!user){
    req.flash('error', 'Email không tồn tại');
    res.redirect('back');
    return;
  }
  if (user.status === 'inactive'){
    req.flash('error', 'Tài khoản chưa được kích hoạt');
    res.redirect('back');
    return;
  }
  //luu vao bang forgot-password
  const objectForgotPassword = {
    email: user.email,
    expireAt: Date.now(),
    otp: generateHelper.generateRandomNumber(8)
  }
  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();
  console.log(forgotPassword);
  //nếu tồn tại email thì gửi OTP qua email
  res.redirect('/');

}