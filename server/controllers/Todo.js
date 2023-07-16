const Todo = require("../models/Todo");
const User = require("../models/User");

// add to-do
exports.addTodo = async (req, res) => {
  try {
    const { title, checked, email } = req.body;

    // handling empty title
    if (!title) {
      return res.status(403).json({
        success: false,
        message: "Please enter a title",
      });
    }

    // create an entry into db
    const createToDo = await Todo.create({
      title: title,
      checked: checked,
    });

    // adding this todo db id into loggedIn user's todos array
    // const pushTodo = await User.findOneAndUpdate(
    //   { email: email },
    //   {
    //     $push: {
    //       todos: createToDo._id,
    //     },
    //   },
    //   { new: true }
    // );

    // sending successful reponse
    return res.status(200).json({
      success: true,
      message: "Todo added successfully",
      data: createToDo._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in creating a to-do",
    });
  }
};

// update todo title
exports.updateTodoTitle = async (req, res) => {
  try {
    const { updatedTitle, todoId } = req.body;

    if (!updatedTitle || !todoId) {
      res.status(403).json({
        success: false,
        message: "todo-id or updated title is missing",
      });
    }

    // find respective todo on basis of todo id and update its title and get the new updated field in response
    const updatedTodo = await Todo.findByIdAndUpdate(
      { _id: todoId },
      {
        title: updatedTitle,
      },
      {
        new: true,
      }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message:
          "Todo with specified id does not exist. Please enter valid id!",
      });
    }

    // sending successful response
    return res.status(200).json({
      success: true,
      message: "Updated todo title",
      updatedTodo: updatedTodo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in updating todo",
    });
  }
};

//update todo checked
exports.updateTodoChecked = async (req, res) => {
  try {
    const { checked, todoId } = req.body;

    if ((!todoId, !checked)) {
      res.status(403).json({
        success: false,
        message: "todo-id is missing",
      });
    }

    // find respective todo on basis of todo id and update its checked and get the new updated field in response
    const updatedTodo = await Todo.findByIdAndUpdate(
      { _id: todoId },
      {
        checked: checked,
      },
      {
        new: true,
      }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo with speicified id does not exist!",
      });
    }

    // sending successful reposne
    return res.status(200).json({
      success: true,
      message: "Updated todo checked",
      updatedTodo: updatedTodo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in updating todo",
    });
  }
};

// delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const { todoId, email } = req.body;

    if (!todoId) {
      return res.status(403).json({
        success: false,
        message: "Invalid todo id",
      });
    }

    // delete todo db id from user's todos array
    // await User.findOneAndUpdate(
    //   { email: email },
    //   {
    //     $pull: {
    //       todos: currentTodoToBeDeleted._id,
    //     },
    //   }
    // );

    await Todo.findByIdAndDelete({ _id: todoId });

    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in deleting todo. Please try again!",
    });
  }
};

// get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find({});

    if (allTodos.length === 0) {
      return res.status(404).json({
        success: false,
        message: "There are no todo items available. Please create one!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Todos retreived successfully",
      data: allTodos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching the Todos",
    });
  }
};
