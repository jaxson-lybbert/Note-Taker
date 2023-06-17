const notes = require("express").Router();
const noteData = require("../db/db.json");
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid"); // unique id for each notes?

// GET request that gets ALL notes from database
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// GET route for retrieveing just ONE note
notes.get("/", (req, res) => {});

// POST route for adding a note
notes.post("/", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      uuid: uuidv4(),
    };
    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully.`);
  } else {
    res.error("Error in adding note");
  }
});

module.exports = notes;
