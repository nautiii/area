const jwt = require('jsonwebtoken')
require("dotenv/config")

function tokenVerifier (req, res, next) {
    const token = req.header('authentification-token');
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

module.exports.tokenVerifier = tokenVerifier;