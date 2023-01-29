const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { append } = require("express/lib/response");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const notes = [];

app.get("/", (req, res) => {
    res.render("home", {notesList: notes})
})

app.post("/", (req, res) =>{

    const note = {
        title: req.body.noteTitle,
        content: req.body.noteBody
    }

    if(note.title === "" && note.content === ""){
        console.log("Enter content");
    } else {
        notes.push(note);
    }
    

    res.redirect("/")
})

app.get("/notes/:title", (req, res) => {
    let requestedTitle = _.lowerCase(req.params.title);

    notes.forEach((note) => {
        let storedTitle = _.lowerCase(note.title);

        if(requestedTitle === storedTitle ){
            res.render("note", {noteTitle: note.title, noteContent: note.content})
        }
    });
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
})