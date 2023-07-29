const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

const Books = [
  {
    id: 1,
    BookName: "PHP 8",
    YearPublished: "2023",
    Author: "Vic S.",
    Category: "Web",
    status: 1,
  },
  {
    id: 2,
    BookName: "React.js",
    YearPublished: "2000",
    Author: "Peter Smith",
    Category: "Web",
    status: 1,
  },
  {
    id: 3,
    BookName: "CSS Framework",
    YearPublished: "2005",
    Author: "Jaguar",
    status: 1,
  },
  {
    id: 4,
    BookName: "Data Science",
    YearPublished: "2023",
    Author: "Vic S.",
    status: 1,
  }
];

const LoginProfiles = [
  {
    id: 1,
    username: "admin",
    password: "passwd123",
    isAdmin: true,
  },
  {
    id: 2,
    username: "staff",
    password: "123456",
    isAdmin: false,
  },
  {
    id: 3,
    username: "vice",
    password: "abrakadabra",
    isAdmin: false,
  },
  {
    id: 4,
    username: "super",
    password: "69843",
    isAdmin: true,
  },
  {
    id: 5,
    username: "user",
    password: "123",
    isAdmin: false,
  }
];

// Middleware to parse JSON body
 app.use(express.json());

// Endpoint to get all books
app.get('/books', (req, res) => {
  res.json(Books);
});

// Endpoint to get a specific book by its ID
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = Books.find((book) => book.id === bookId);

  if (!book) {
    res.status(404).json({ message: 'Book not found' });
  } else {
    res.json(book);
  }
});

// Endpoint for login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const profile = LoginProfiles.find(
    (profile) => profile.username === username && profile.password === password
  );

  if (!profile) {
    res.status(401).json({ message: 'Invalid credentials' });
  } else {
    res.json(profile);
  }
});

// Compare the provided password with the stored hashed password
bcrypt.compare(password, profile.password, (err, result) => {
  if (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
  if (!result) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

// Generate a JWT token
const token = jwt.sign({ id: profile.id, username: profile.username }, 'your-secret-key', {
  expiresIn: '1h', // Token expires in 1 hour
});

// Send the token in the response
res.json({ token });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
