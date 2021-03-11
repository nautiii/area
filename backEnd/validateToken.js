const jwt = require('jsonwebtoken')
const User = require('./models/User');
require("dotenv/config")

function tokenVerifier (req, res, next) {
    const token = req.header('access-token');
    if (!token)
        return res.status(401).json({message: 'Access Denied', success: 'false'});
    try {
        const verify = jwt.verify(token, process.env.TOKEN_PASS);
        req.user = verify;
        next();
    } catch(err) {
        return res.status(400).json({message: "Invalid Token Access", success: 'false'})
    }
    
}

async function jwtToUser(webToken) {
    const id = jwt.verify(webToken, process.env.TOKEN_PASS);
    try {
        const checkUser = await User.findOne({_id: id._id});
        return checkUser;
    } catch(err){return ({message: "error"})}
    console.log(_id);
}

module.exports.tokenVerifier = tokenVerifier;
module.exports.jwtToUser = jwtToUser;