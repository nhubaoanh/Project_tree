const jwt = require("jsonwebtoken");
const secret = "thong tin cua gia dinh toi nhe 21";
class MiddleWareController {
  verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) { 
      jwt.verify(token, secret, (err, account) => {
        if (err) {
          res.status(403).json("Token không hợp lệ!");
        } else {
          req.account = account;  
          next();
        } 
      });
    } else {
      res.status(403).json("Bạn không có quyền truy cập!");
    }
  } 
  verifyTokenAndSelfAuth = (req, res, next) => {     
    this.verifyToken(req, res, () => { 
      // let originalUrl = req.originalUrl;  
      // let idx = req.account.actions.findIndex(x => originalUrl.indexOf(x.action_api_url) >= 0 && x.action_api_url != null);  
      // if (idx >=0) {
        next();
      // } else {
      //   res.status(403).json("Bạn không có quyền truy cập chức năng này!");
      // }
    });
  }; 
  verifyTokenAndAdminSelfAuth = (req, res, next) => {
    this.verifyToken(req, res, () => {  
      // let originalUrl = req.originalUrl;  
      // let idx = req.account.actions.findIndex(x => originalUrl.indexOf(x.action_api_url) >= 0 && x.action_api_url != null);  
      // if (idx >=0 && req.account.role_group.indexOf('sa,') >= 0) {
        next();
      // } else {
      //   res.status(403).json("Bạn không có quyền truy cập chức năng này!");
      // }
    });
  }; 
}
module.exports = new MiddleWareController();
