
// install required packages
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4,} = require("uuid");

// PORT number
const PORT = 3001;

// Initialize Express app
const app = express();

//add middleware
app.use(express.json()); // parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public")); // serve static files from the public folder


//use GET route to send the notes.html file to the client
app.get("/notes", (req, res) => { // send the notes.html file to the client
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// POST route to save a new note
app.post('/api/notes', (req, res) => { // create a new note
  fs.readFile('./db/db.json', 'utf8', (err, data) => { // if error reading file, log it and return
    const {title, text} = req.body;
      if(req.body){
        const newParsedNote = { // create a new note object with id and title and text properties
          title,
          text,
          id: uuidv4(),
        };
        const db = JSON.parse(data); // parse the db.json file and convert it to a JavaScript object 
        db.push(newParsedNote); // add the new note to the db array 
        fs.writeFile('./db/db.json', JSON.stringify(db), 'utf8', (err) => { // if error writing file, log it and return
          console.log(err);
          return res.status(500).json('Error saving note');
        });
        res.json('Note saved successfully');
      }
        });
      });

 // use GET route to get all notes
 app.get('/api/notes', (req, res) => { // read the db.json file and send all notes as json response
  fs.readFile('./db/db.json', 'utf8', (err, data) => { // if error reading file, log it and return
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// use GET route to get a single note by id
app.get('/api/notes/:id', (req, res) => { // read the db.json file and find the note with the given id
  fs.readFile('./db/db.json', 'utf8', (err, data) => { // if error reading file, log it and return
    if (err){
      console.log(err);
      return res.status(500).json({ error: 'Failed to read notes' });
    }
    const singleNote = JSON.parse(data); // find the note with the given id in the db array 

    const note = singleNote.find((note) => note.id === req.params.id); // find the note with the given id
    if (!note) {
      console.log(err)
      return res.status(404).json('Note not found');
    }
  });
});

//use DELETE route to delete a note by id
app.delete('/api/notes/:id', (req, res) => { // read the db.json file and filter out the note with the given id
  const noteId = req.params.id; // get the id of the note to be deleted
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if(err) throw err;
    const updateNotes = JSON.parse(data); // parse the db.json file and convert it to a JavaScript object 
    const updated = updateNotes.filter((note) => note.id!== noteId); // filter out the note with the given id
    fs.writeFile('./db/db.json', JSON.stringify(updated), 'utf8', (err) => { // if error writing file, log it and return
      if (err) throw err;
      res.json('Note deleted successfully');
    });
  })});

  //add listening to the server
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });

// TEST SERVER.JS FOR ANY DEBUGGING
