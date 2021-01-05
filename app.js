const express = require('express'),
  app = express(),
  date = require(`${__dirname}/date.js`),
  mongoose = require('mongoose'),
  port = 3000;

// set up datebase connection
mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true});
// create DB schema
const itemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model('Item', itemSchema);
const item1 = new Item({ name: "Welcome to your todolist!" });
const item2 = new Item({ name: "Hit the + button to add a new item." });
const item3 = new Item({ name: "<-- Hit this to delete an item." });



app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');



// GET Requests

app.get("/", (req, res) => {
  res.render('list', {
    listTitle: date.generateDate(),
    newItems: items
  });
});

app.get("/work", (req, res) => {
  res.render('list', {
    listTitle: 'Work List',
    newItems: workItems
  });
});

app.get("/about", (req, res) => {
  res.render('about', {});
});


// POST Requests

app.post("/", (req, res) => {
  if (req.body.list === "Work List") {
    workItems.push(req.body.newItem);
    res.redirect("/work")
  } else {
    items.push(req.body.newItem);
    res.redirect("/");
  }
});


app.listen(port, () => {
  console.log(`Server is runnig on port: ${port}`);
});
