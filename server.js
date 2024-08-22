const express = require('express');
const app = express();
const cors = require('cors');
const dummyPosts = require('./data/dummydata');

// CORS
app.use(cors()); // Correctly call cors as a function

// Middleware to parse form-data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON
app.use(express.json());

const PORT = process.env.PORT || 8000;

// Get all posts
app.use('/', require('./routes/PostsRoute'))

// Get single post
app.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = dummyPosts.filter(post => post.id === id);
    console.log(post);
    res.json(post);
});

// Post new post
app.post('/new', (req, res) => {
    const newPost = {
        id: parseInt(req.body.id),
        title: req.body.title,
        post: req.body.post,
    };
    console.log('Received data:', newPost);

    // Ensure the new post has id, title, and content
    if (!newPost.id || !newPost.title || !newPost.post) {
        return res.status(400).json({ error: 'Post must include an id, title, and content' });
    }

    // Add the new post to the dummyPosts array
    dummyPosts.push(newPost);
    console.log(dummyPosts);

    // Send a response confirming the addition
    res.status(201).json({ message: 'Post added successfully', newPost });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
