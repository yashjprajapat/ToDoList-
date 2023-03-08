const express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/todo");

const trySchema = new mongoose.Schema({
  name: String,
});

const item = mongoose.model("task", trySchema);

const todo = new item({
  name: "Learn MERN stack",
});

const todo2 = new item({
  name: "Checkout more udemy courses",
});

const todo3 = new item({
  name: "Watch youtube",
});

const todo4 = new item({
  name: "Create projects",
});

// todo2.save();
// todo3.save();
// todo4.save();
app.get("/", function (req, res) {
  item
    .find()
    .then((data) => {
      res.render("list.ejs", { ejes: data });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post("/", function (req, res) {
  const itemName = req.body.ele1;
  const todo4 = new item({
    name: itemName,
  });
  todo4.save();
  res.redirect("/");
});
// app.post("/delete", function (req, res) {
//   const checked = req.body.checkbox1;
//   item.findByIdAndRemove(checked, function (err) {
//     if (!err) {
//       console.log("Deleted!!");
//       res.redirect("/");
//     }
//   });
// });
app.post("/delete", function (req, res) {
  const checked = req.body.checkbox1;
  item
    .findByIdAndRemove(checked)
    .then(() => {
      console.log("Deleted!");
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
    });
});

app.listen("3000", function () {
  console.log("Server started!!");
});
