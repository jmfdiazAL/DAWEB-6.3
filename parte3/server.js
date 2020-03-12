const express = require('express');
const body_parser = require('body-parser');
const server = express();
const port = 4000;

const db = require('diskdb');
db.connect('./data', ['movies']);

server.use(body_parser.json());

server.get("/items", (req, res) => {
    res.json(db.movies.find());
});

server.get("/items/:id", (req, res) => {
    const itemId = req.params.id;
    const items = db.movies.find({ id: itemId });
    if (items.length) {
       res.json(items);
    } else {
       res.json({ message: `item ${itemId} doesn't exist` })
    }
});

server.post("/items", (req, res) => {
    const item = req.body;
    console.log('Adding new item: ', item);
    // add new item to db
    db.movies.save(item);
    // return updated list
    res.json(db.movies.find());
});

server.put("/items/:id", (req, res) => {
    const itemId = req.params.id;
    const item = req.body;
    console.log("Editing item: ", itemId, " to be ", item);
 
    db.movies.update({ id: itemId }, item);
 
    res.json(db.movies.find());
 });
 
 server.delete("/items/:id", (req, res) => {
    const itemId = req.params.id;
    console.log("Delete item with id: ", itemId);
 
    db.movies.remove({ id: itemId });
 
    res.json(db.movies.find());
});

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});