const express = require('express');
const body_parser = require('body-parser');
const server = express();
const port = 4000;
let data = require('./data');

server.use(body_parser.json());

server.get("/items", (req, res) => {
    res.json(data);
});

server.get("/items/:id", (req, res) => {
    const itemId = req.params.id;
    const item = data.find(_item => _item.id === itemId);
 
    if (item) {
       res.json(item);
    } else {
       res.json({ message: `item ${itemId} doesn't exist`})
    }
});

server.post("/items", (req, res) => {
    const item = req.body;
    console.log('Adding new item: ', item);
 
    // add new item to array
    data.push(item)
 
    // return updated list
    res.json(data);
});

server.put("/items/:id", (req, res) => {
    const itemId = req.params.id;
    const item = req.body;
    console.log("Editing item: ", itemId, " to be ", item);
 
    const updatedListItems = [];
    // loop through list to find and replace one item
    data.forEach(oldItem => {
       if (oldItem.id === itemId) {
          updatedListItems.push(item);
       } else {
          updatedListItems.push(oldItem);
       }
    });
 
    // replace old list with new one
    data = updatedListItems;
 
    res.json(data);
});
 
server.delete("/items/:id", (req, res) => {
    const itemId = req.params.id;
 
    console.log("Delete item with id: ", itemId);
 
    // filter list copy, by excluding item to delete
    const filtered_list = data.filter(item => item.id !== itemId);
 
    // replace old list with new one
    data = filtered_list;
 
    res.json(data);
});

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});