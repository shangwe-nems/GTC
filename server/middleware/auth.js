const { User } = require('../models/users');
const Permissions = require('../models/permissions');
const moment = require('moment');

let auth = (req, res, next) => {
    let token = req.cookies.w_auth;
    let time = req.cookies.w_authExp;

    if (token) {
        User.findByToken(token,  async (err, user) => {
            if (err) throw err;
            
            if (!user)
                return res.status(500).json({
                    isAuth: false,
                    error: true,
                    message: "invalid token"
                });
            
            if (!moment(time).isAfter(moment())) 
                return res.status(500).json({ isAuth: false, error: true, message: "token expired" });
    
            const permission = await Permissions.findById(user.user_type).lean();

            req.token = token;
            req.userData = user;
            req.userPermission = permission;
            next();
        });
    } else {
        return res.status(500).json({ success: false, isAuth: false, message: 'JWT must be provided' });
    }
    
}

module.exports = { auth };