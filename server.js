const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8000;

// CORS
app.use(cors()); // Correctly call cors as a function

// Middleware to parse form-data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON
app.use(express.json());

// Posts route
app.use('/posts', require('./routes/postRoute'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
