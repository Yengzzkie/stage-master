const dummyPosts = require('../data/dummydata');

// Get all posts
const getPosts = function(req, res) {
    res.json(dummyPosts);
}

module.exports = { getPosts }