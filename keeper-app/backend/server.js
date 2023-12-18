const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
//mongodb+srv://santhu:vTOln5LwinZgPwwT@santhosh.z36snbm.mongodb.net/keeperdb
mongoose.connect('http://172.17.1.80:6435', {
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
// Add this route to handle note deletion
app.delete('/api/notes/:index', async (req, res) => {
  const { index } = req.params;

  try {
    // Assuming the notes are stored in an array or another data structure
    // If using MongoDB, you might need to modify this logic based on your data structure
    const notes = await Note.findOneAndDelete({ _id: index});
    console.log(notes)
    if (index >= 0 && index < notes.length) {
      // Remove the note at the specified index
      notes.splice(index, 1);

      // Update the database or data structure accordingly
      // In this example, we're not updating the database, just returning the updated notes array
      res.json(notes);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
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
