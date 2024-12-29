const nova = require("novaxjs2");
const fs = require('fs');
const path = require('path');
const port = 3000;
const app = nova();

app.js = '';  // Necessary placeholder for nova framework

// Define the file path for posts data
const postsFilePath = path.join(__dirname, '../public','posts.json');

// Read the posts from the JSON file
let posts = JSON.parse(fs.readFileSync(postsFilePath));

// Serve the main page (index.html) for the Forums web app
app.get('/', () => {
  return fs.readFileSync(path.join(__dirname, '..', 'public','index.html'));
});

// Serve all posts via the /api/posts route
app.get('/api/posts', (req, res) => {
  res.json(posts);  // Send all posts as JSON
});

// Serve a single post by ID via the /api/posts/:id route
app.get('/api/posts/:id', (req, res) => {
  const postId = req.params.id;  // Get the post ID from the URL
  const post = posts.find(p => p.id === postId);  // Find the post by ID
  if (post) {
    res.json(post);  // Send the post as JSON
  } else {
    res.json({ message: "Post not found" });  // If post not found
  }
});

// Handle the creation of a new post (POST /api/posts route)
app.post('/api/posts', (req, res) => {
  const newPost = req.body;  // Get new post data from the request body

  // Basic validation: ensure title and content are provided
  if (!newPost.title || !newPost.content) {
    return res.json({ message: "Title and content are required" });
  }

  // Create a new post with a simple ID generation based on the current posts length
  newPost.id = (posts.length + 1).toString();  // Basic ID generation
  posts.push(newPost);  // Add the new post to the posts array

  // Save the updated posts back into the posts.json file
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));

  res.json({ message: "Post added successfully", post: newPost });
});

// Start the app on the specified port
app.at(port, () => {
  console.log(`Forums app is running on https://localhost:${port}`);
});