(function() {

  'use strict';
  var express = require('express');
  var router = express.Router();


const {Todo} =  require('./../models/todo');
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/meantodo";

mongoose.Promise = global.Promise;
mongoose.connect(url);
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });

  router.get('/api/todos', function(req, res) {
    Todo.find(function(err, data) {
      res.json(data);
    });
  });

  router.post('/api/todos', function(req, res) {
    console.log(req.body.todo);
    var todo = new Todo({
    todo:req.body.todo
  });
    todo.save().then((doc)=>{
    res.json(doc);
},(err)=>{
  res.status(400).send(err);
});

  });

  // var query = { name: 'borne' };
  // Model.update(query, { name: 'jason borne' }, options, callback)

  router.put('/api/todos', function(req, res) {
Todo.update({
      _id: req.body._id
    }, {
      isCompleted: req.body.isCompleted,
      todo: req.body.todo
    }, {}, function(err, data) {
      res.json(data);
    });

  });

  router.delete('/api/todos/:_id', function(req, res) {
    console.log(req.params);
    Todo.findByIdAndRemove(req.params._id,function(err, data) {
      res.json(data);
    });
  });

  module.exports = router;

}());
