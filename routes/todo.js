const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const todoController = require('../controllers/todoController');

router.get('/', auth, todoController.getTodos);
router.post('/', auth, todoController.createTodo);
router.put('/:id', auth, todoController.updateTodo);
router.delete('/:id', auth, todoController.deleteTodo);

module.exports = router;
