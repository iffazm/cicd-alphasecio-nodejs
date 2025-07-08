let todos = [];

exports.getTodos = (req, res) => {
  const userTodos = todos.filter(t => t.user === req.user.email);
  res.json(userTodos);
};

exports.createTodo = (req, res) => {
  const todo = {
    id: Date.now(),
    text: req.body.text,
    done: false,
    user: req.user.email
  };
  todos.push(todo);
  res.status(201).json(todo);
};

exports.updateTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id && t.user === req.user.email);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  todo.text = req.body.text ?? todo.text;
  todo.done = req.body.done ?? todo.done;
  res.json(todo);
};

exports.deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => !(t.id === id && t.user === req.user.email));
  res.status(204).send();
};
