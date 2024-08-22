import './index.css';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    post: ''
  });

  // Function to fetch posts from the server
  async function fetchPosts() {
    try {
      const response = await fetch('http://localhost:8080/');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []); // Empty dependency array means this useEffect runs only on mount

  // Function to handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Clear form data and fetch updated posts
      setFormData({ id: '', title: '', post: '' });
      fetchPosts(); // Fetch the updated list of posts

    } catch (error) {
      console.error('Error adding post:', error);
    }
  }

  // Function to handle changes in the form fields
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  // Function to handle deletion of a post
  async function handleDelete(postId) {
    try {
      const response = await fetch(`http://localhost:8080/delete/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      fetchPosts(); // Fetch the updated list of posts

    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center shadow-sm shadow-gray-500 rounded-md width-full p-4">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="id" className="text-amber-500">ID:</label>
        <input
          type="number"
          name="id"
          id="id"
          value={formData.id}
          onChange={handleChange}
        />

        <label htmlFor="title" className="text-amber-500">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label htmlFor="post" className="text-amber-500">Comment:</label>
        <textarea
          name="post"
          id="post"
          value={formData.post}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>

      <ul>
        {data.map(post => (
          <li key={post.id}>
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="font-bold">Comment:</p>{post.post}
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;