const User = require('../models/User');
const Area = require('../models/Action');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {availableServices} = require('../utils')
const {actionVerifier} = require('../validateActions')
const {tokenVerifier, jwtToUser} = require('../validateToken')

router.patch('/register', tokenVerifier, async(req, res) => {
    try {
        const result = await jwtToUser(req.header('access-token'))
        const newAction = new Area({
            action: req.body.action,
            reaction: req.body.reaction,
        });

        // if (!actionVerifier(newAction))
        //     return res.json({message: 'Wrong action format', success: 'false'})

        // console.log(newAction);
        await User.updateOne({username: result.username},
            {$push: {
                actions: {
                    "action": newAction.action,
                    "reaction": newAction.reaction,
                }
            }});
        res.json({message: `created new action : ${newAction}`, success:"true", id: newAction._id});
        // console.log(req.body)
        }
        catch(err){res.status(400).json({message: err, success: 'false'})}
});

module.exports = router;