const express = require('express');
const router = express.Router();

// import controllers
const {addTodo, updateTodo, deleteTodo} = require('../controllers/Todo');

// define api routes
router.post("/addTodo", addTodo);
router.put("/updateTodo", updateTodo);
router.delete("/deleteTodo", deleteTodo);

module.exports = router;