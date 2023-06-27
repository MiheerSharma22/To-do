const express = require('express');
const router = express.Router();

// import controllers
const {addTodo, updateTodo, deleteTodo, getAllTodos} = require('../controllers/Todo');

// define api routes
router.post("/addTodo", addTodo);
router.put("/updateTodo", updateTodo);
router.delete("/deleteTodo", deleteTodo);
router.get("/getAllTodos", getAllTodos);

module.exports = router;