const notes = require("express").Router();
const noteData = require("../db/db.json");
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid"); // unique id for each notes?

// GET request that gets ALL notes from database
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// GET route for retrieveing just ONE note
notes.get("/:id", (req, res) => {
  const requestedID = req.params.id;

  for (i = 0; i < noteData.length; i++) {
    if (requestedID === noteData[i].id) {
      return res.json(JSON.parse(noteData[i]));
    }
  }
});

// POST route for adding a note
notes.post("/", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    readAndAppend(newNote, "./db/db.json");
    res.json("Note added successfully.");
  } else {
    res.json("Error in adding note");
  }
});

// DELETE request for exisiting notes
// notes.delete("/:id", (req, res) => {
//   const requestedID = req.params.id;

//   for (i = 0; i < noteData.length; i++) {
//     if (requestedID === noteData[i].id) {
//       readAndAppend(JSON.parse(noteData.splice(i, 1)), "./db/db.json");
//     }
//   }
// });

module.exports = notes;
