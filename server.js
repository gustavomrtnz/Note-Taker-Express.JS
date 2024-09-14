//TODO: Import necessary modules
const express = require('express');
const path = require('path');
const fs = require('fs');


const uniqid = require("uniqid");

const PORT = process.env.PORT || 3001;

const app = express();

//TODO: Middlewares for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// TODO: GET route for reading html files 



// TODO: GET route for reading notes.html file 


// TODO: POST route for creating a new note


    //TODO: GET route for reading all notes


    // TODO: DELETE route for deleting a note


    // TODO: GET route for retrieving a single note by ID



    // TODO: PUT route for updating a note

        // TODO: Start the server





