const router = require('express').Router();
const {availableServices} = require('../utils/actionModels')
const {tokenVerifier, jwtToUser} = require('../utils/validateToken')

// get all services
router.get('/', tokenVerifier, async (req, res) => {
    try {
        const result = await jwtToUser(req.header('access-token'))
        res.status(200).json({success: "true", services: availableServices});
    }catch(err){res.json({success: "false"})}
})
module.exports = router;