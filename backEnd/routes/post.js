const Post = require('../models/Post')
const express = require('express');

const router = express.Router();

// get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    }catch(err){res.json({message: 'error'})}
});


//sub a post
router.post('/', (req, res) => {
    console.log(req.body)
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    post.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({message: "error"})
    })
});

//get specific post
router.get('/:postId', async (req, res) => {
    try {
    const post = await Post.findById(req.params.postId);
    res.json(post)
    }catch(err) {
        res.json({message: err});
    }
})

//delete specific post
router.delete('/:postId', async (req, res) => {
    try {
    const removed = await Post.deleteOne({_id: req.params.postId})
    res.json(removed)
    }catch(err) {
        res.json({message: err})
    }
})

//update Post
router.patch('/:postId', async (req, res) => {
    try {
    const updated = await Post.updateOne({_id: req.params.postId}, 
        {$set: {title: req.body.title}}); // set new object to update values
    res.json(updated);
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = router;