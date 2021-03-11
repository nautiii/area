const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {tokenVerifier, jwtToUser} = require('../utils/validateToken');
const jwt = require('jsonwebtoken');

router.get('/', tokenVerifier, async(req, res) => {
    try {
        const result = await jwtToUser(req.header('access-token'))
        res.json({success: true});
    }catch(err){res.json({message: 'error'})}
});

router.patch('/register', tokenVerifier, async(req, res) => {
    try {
        const result = await jwtToUser(req.header('access-token'))

        const updated = await User.updateOne(
            {
                username: result.username
            },
            {
                $set:
                {
                    facebookProvider:
                    {
                        authToken: req.body.token, active: true
                    }
                }
            }
        );
        res.json({success:"true", user: result});
    }
    catch(err) {
        console.log(err)
        res.json({success: 'false', message: "couldn't get service's token"})
    }
});

router.patch('/logout', tokenVerifier, async (req, res) => {
    try {
        const result = await jwtToUser(req.header('access-token'))
        const updated = await User.updateOne({username: result.username},
            {$set: {facebookProvider: {authToken: "",
                    active: false}}});
        res.json({success: 'true', message: 'logged out successfully of Facebook'});
        }catch(err){res.json({success: 'false'})}
})

module.exports = router;