const notes = require("express").Router();
const notesData = require("../db/db.json");
const { v4: uuidv4 } = require("uuid"); // unique id for each notes?

// GET request that gets all notes from database
notes.get("/", (req, res) => {
  res.json(JSON.parse(notesData));
});

notes.post("/", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      uuid: uuidv4(),
    };
  }
});

module.exports = notes;
