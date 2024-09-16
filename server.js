
// install required packages
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4, v4 } = require("uuid");

// PORT number
const PORT = 3001;

// Initialize Express app
const app = express();

//add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));


//use GET route to send the notes.html file to the client
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// POST route to save a new note
app.post('api/notes', (req, res) => {
  fs.readFile('.db/db.json', 'utf8', (err, data) => {
    const {title, text} = req.body;
      if(req.body){
        const newParsedNote = {
          title,
          text,
          id: uuidv4(),
        };
        const db = JSON.parse(data);
        db.push(newParsedNote);
        fs.writeFile('.db/db.json', JSON.stringify(db), 'utf8', (err) => {
          console.log(err);
        });
        res.json(newParsedNote);
      }
        });
      });

 // use GET route to get all notes
 app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// use GET route to get a single note by id
app.get('/api/notes/:id', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err){
      console.error(err);
    }
    const singleNote = JSON.parse(data);

    const note = singleNote.find((note) => note.id === req.params.id);
    if (!note) {
      return res.json('Note not found');
    }
  });
});

//use DELETE route to delete a note by id
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if(err) throw err;
    const emptyNotes = JSON.parse(data);
    const updatedNotes = emptyNotes.filter((note) => note.id!== noteId);
    fs.writeFile('./db/db.json', JSON.stringify(updatedNotes), 'utf8', (err) => {
      if (err) throw err;
      res.json('Note deleted successfully');
    });
  })});

  //add listening to the server
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });

// End of the file
