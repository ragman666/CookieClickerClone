const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'usernames.json');

app.use(cors());
app.use(express.json());

function readUsers() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf8');
}

app.get('/users', (req, res) => {
  res.json(readUsers());
});

app.post('/users', (req, res) => {
  const username = (req.body && req.body.username || '').toString().trim();
  if (!username) return res.status(400).json({ error: 'username required' });
  const users = readUsers();
  if (!users.includes(username)) {
    users.push(username);
    writeUsers(users);
  }
  res.json({ saved: true, username, users });
});

app.listen(PORT, () => {
  console.log(`Username server listening on http://localhost:${PORT}`);
});
