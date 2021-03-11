const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {tokenVerifier, jwtToUser} = require('../utils/validateToken');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const url = require('url');

const formUrlEncode = (data) => {
    return Object.entries(data)
      .map(([k, v]) => k + '=' + v)
      .join('&')
  }

router.get('/', tokenVerifier, async(req, res) => {
    try {
        const result = await jwtToUser(req.header('access-token'))
        res.json({success: true});
    }catch(err){res.json({message: 'error'})}
});

router.patch('/register', tokenVerifier, async(req, res) => {
    try {
        let responseData = {}
        const result = await jwtToUser(req.header('access-token'))
        const code = req.body.code
        const data = {
            client_id: '0360b42df58644e440de',
            client_secret: '703789ee94767d55e67623b618f07211dd38d6c2',
            code: code
        }

        const config = {
            method: 'post',
            url: 'https://github.com/login/oauth/access_token',
            data: formUrlEncode(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
        }

        await axios(config)
        .then(function (response) {
          responseData = response.data
        })
        .catch(function (error) {
          responseData = error.response
        })

        const updated = await User.updateOne(
            {
                username: result.username
            },
            {
                $set:
                {
                    githubProvider:
                    {
                        authToken: responseData.access_token, active: true
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
            {$set: {githubProvider: {authToken: "",
                    active: false}}});
        res.json({success: 'true', message: 'logged out successfully of Github'});
        }catch(err){res.json({success: 'false'})}
})

module.exports = router;