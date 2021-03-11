const User = require('../models/User');
const Area = require('../models/Action');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {hashPassword} = require('../hashPass')
const {tokenVerifier, jwtToUser} = require('../utils/validateToken')
const {checkRegisterValidate, checkLoginValidate} = require('../utils/validationAuth');
const { deleteOne } = require('../models/Action');
const { object } = require('@hapi/joi');
require("dotenv/config")

router.post('/register', async (req, res) => {
    //validate user data before saving
    const {error} = checkRegisterValidate(req.body)
    if (error)
        return res.status(400).json({message: error.details[0].message, success: "false"});
    //Checking if user already exist
    const checkMailExist = await User.findOne({email: req.body.email});
    const checkUserExist = await User.findOne({username: req.body.username});
    if (checkMailExist)
        return res.status(400).json({message: "Mail already used", success: "false"});
    if (checkUserExist)
        return res.status(400).json({message: "User already exist", success: "false"});
    // hash password
    const hashedPassword = await hashPassword(req.body.password);
    if (!hashPassword)
        return res.status(400).send("Error with password generation");
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
    });
    try {
        const newUser = await user.save();
        const authToken = jwt.sign({_id: newUser._id}, process.env.TOKEN_PASS);
        res.header('access-token', authToken)
        res.json({username: newUser.username, email: newUser.email, accessToken: authToken, decoded: authToken, success: true});
    } catch(err) {
        res.status(400).json({message: err, success: 'false'});
    }
})

router.post('/login', async (req, res) => {
    const {error} = checkLoginValidate(req.body)
    if (error)
        return res.status(400).json({message: error.details[0].message, success: "false"});
    const checkUser = await User.findOne({username: req.body.username});
    if (!checkUser)
        return res.status(400).json({message: "User doesn't exist", success: "false"});
    const isValid = await bcrypt.compare(req.body.password, checkUser.password);
    if (!isValid)
        return res.status(400).json({message: "Wrong password", success: "false"});
    const authTok = jwt.sign({_id: checkUser._id}, process.env.TOKEN_PASS);
    res.header('access-token', authTok);
    res.json({username: checkUser.username, email: checkUser.email, accessToken: authTok, success: true});
})

router.get('/actions', tokenVerifier, async(req, res) => {
    try {
        const result = await jwtToUser(req.header('access-token'))
        res.json({success: true, UserAction: result.actions});
    }catch(err){res.json({message: 'error'})}
});

router.post('/action', tokenVerifier, async(req, res) => {
    try {
        const result = await jwtToUser(req.header('access-token'))
        const newAction = new Area({
            action: req.body.action,
            reaction: req.body.reaction,
        });

        // if (!actionVerifier(newAction))
        //     return res.json({message: 'Wrong action format', success: 'false'})

        await User.updateOne({username: result.username},
            {$push: {
                actions: {
                    "action": newAction.action,
                    "reaction": newAction.reaction,
                }
            }});
        res.json({message: `created new action : ${newAction}`, success:"true", id: newAction._id});
    }
    catch(err) {
        res.status(400).json({message: err, success: 'false'})
    }
});

router.patch('/action', tokenVerifier, async(req, res) => {
    try {
        const result = await jwtToUser(req.header('access-token'))
        const newAction = new Area({
            action: req.body.action,
            reaction: req.body.reaction,
        });
        await User.updateOne({"actions._id": req.body._id},
            {$set: {
                "actions.$": {
                    "action": newAction.action,
                    "reaction": newAction.reaction,
                }
            }});
        res.json({message: `updated action : ${newAction}`, success:"true", id: newAction._id});
    }
    catch(err) {
        res.status(400).json({message: err, success: 'false'})
    }

});

router.delete('/action', tokenVerifier, async(req, res) => {
    try {
        const result = await jwtToUser(req.header('access-token'))
        await User.updateOne({username: result.username},
            {$pull: {
                "actions": {
                    _id: req.body._id
                }
            }},
            {multi: true});
        res.json({success: true, UserAction: result.actions});
    }
    catch(err)
    {
        console.log(err)
        res.json({message: 'Couldnt delete action', success: 'false'})
    }
});



module.exports = router;