const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://santhu:vTOln5LwinZgPwwT@santhosh.z36snbm.mongodb.net/keeperdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model('Note', noteSchema);

app.get('/', (req, res) => {
    res.send('Welcome to the Keeper API');
  });

app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve notes' });
  }
});

app.post('/api/notes', async (req, res) => {
  console.log('Received a POST request:', req.body);
  const { title, content } = req.body;

  try {
    const newNote = new Note({
      title,
      content,
    });

    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save note' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
