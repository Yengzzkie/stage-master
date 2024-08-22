const dummyPosts = require('../data/dummydata');

// Get all posts
const getPosts = (req, res) => {
    res.json(dummyPosts);
}

// Get single post
const getPost = (req, res) => {
    const id = parseInt(req.params.id);
    const post = dummyPosts.find(post => post.id === id);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
}

// Delete single post
const deletePost = (req, res) => {
    const id = parseInt(req.params.id);
    const postIndex = dummyPosts.findIndex(post => post.id === id);
    if (postIndex !== -1) {
        dummyPosts.splice(postIndex, 1); // Remove the post from the array
        res.json({ message: 'Post deleted successfully' });
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
}

// Create new post
const createPost = (req, res) => {
    const newPost = {
        id: parseInt(req.body.id),
        title: req.body.title,
        post: req.body.post,
    };
    console.log('Received data:', newPost);

    if (!newPost.id || !newPost.title || !newPost.post) {
        return res.status(400).json({ error: 'Post must include an id, title, and content' });
    }

    dummyPosts.push(newPost);
    console.log(dummyPosts);

    res.status(201).json({ message: 'Post added successfully', newPost });
}

module.exports = { getPosts, getPost, createPost, deletePost }