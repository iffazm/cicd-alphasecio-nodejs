const express = require('express');
const path = require('path');

// Import routers
const indexRouter = require('./routes/index');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/', indexRouter);
app.use('/api/todos', todoRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
