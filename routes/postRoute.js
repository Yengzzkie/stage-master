const express = require('express');
const router = express.Router();
const { getPosts ,getPost, createPost, deletePost } = require('../controllers/postController')

// Get all posts
router.route('/').get(getPosts)

// Create new post
router.post('/new', createPost);

// Get single post
router.route('/:id').get(getPost).delete(deletePost)

module.exports = router;