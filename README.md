
# Novaxjs2

Novaxjs2 is a lightweight, flexible, and extensible web framework built for Node.js. It is designed to simplify the process of building and serving dynamic web applications. With a focus on simplicity and performance, Novaxjs2 provides a straightforward API that allows developers to quickly create and manage HTTP servers, handle routing, serve static files, and apply middleware—all while keeping the code clean and minimal.

## Installation

To install the Novaxjs2 framework and get started with your app, use the following command:

```bash
npm install novaxjs2
```

Once installed, you can start your application:

```bash
npm start
```
Here is the **Demo Link** to check out the project: [Demo Link](https://forums-eg89.onrender.com/).

## Example: Forums App

This section demonstrates how you can build a simple Forums app using Novaxjs2. The app will allow users to view all posts, view a specific post by ID, and add new posts to the forum.

### Features

- **View all posts**: Displays all forum posts in JSON format.
- **View a specific post**: Allows users to view a specific post by its unique ID.
- **Create a new post**: Users can submit new posts, which are stored in a JSON file and retrieved dynamically.

### File Structure

- `public/index.html`: The main page that displays the forums.
- `public/posts.json`: A JSON file that stores all the forum posts.

### main file

- `api/index.js`: This is main file the api you can edit

### Code Example

```javascript
const nova = require("novaxjs2");
const fs = require('fs');
const path = require('path');
const port = 3000;
const app = nova();

app.js = '';  // Necessary placeholder for nova framework

// Define the file path for posts data
const postsFilePath = path.join(__dirname, '../public', 'posts.json');

// Read the posts from the JSON file
let posts = JSON.parse(fs.readFileSync(postsFilePath));

// Serve the main page (index.html) for the Forums web app
app.get('/', () => {
  return fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'));
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
```

### Running the Forums App

1. **Start the server**: Run `npm start` to start the server.
2. **Access the forum**: Open your browser and visit `http://localhost:3000` to see the forum interface.
3. **Create a post**: Use the `POST` request at `http://localhost:3000/api/posts` to submit new posts. Ensure that the `title` and `content` fields are provided.
4. **View all posts**: Send a `GET` request to `http://localhost:3000/api/posts` to get all the forum posts in JSON format.
5. **View a specific post**: Use a `GET` request to `http://localhost:3000/api/posts/:id`, replacing `:id` with the ID of the post you want to view.

---
