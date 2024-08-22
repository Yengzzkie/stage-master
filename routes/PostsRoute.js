const express = require('express');
const router = express.Router();
const { getPosts } = require('../controllers/postsController')

// Get all posts
router.route('/').get(getPosts)

module.exports = router;