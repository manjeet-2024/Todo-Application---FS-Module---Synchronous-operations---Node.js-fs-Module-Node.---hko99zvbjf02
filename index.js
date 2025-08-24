const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "db.txt");

// helper → read todos
const readTodos = () => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, "[]", "utf-8");
  }
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data || "[]");
};

// helper → write todos
const writeTodos = (todos) => {
  fs.writeFileSync(dbPath, JSON.stringify(todos), "utf-8");
};

// 1. return db.txt contents in string format
const getTodosSync = () => {
  return fs.readFileSync(dbPath, "utf-8");
};

// 2. return respective todo in string format
const getTodoSync = (id) => {
  const todos = readTodos();
  const todo = todos.find((t) => t.id === id);
  return todo ? JSON.stringify(todo) : null;
};

// 3. create todo
const createTodoSync = (todo) => {
  const todos = readTodos();
  todos.push(todo);
  writeTodos(todos);
};

// 4. update todo's title OR mark completed
const updateTodoSync = (id, updates) => {
  const todos = readTodos();
  const index = todos.findIndex((t) => t.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...updates };
    writeTodos(todos);
  }
};

// 5. delete todo
const deleteTodoSync = (id) => {
  let todos = readTodos();
  todos = todos.filter((t) => t.id !== id);
  writeTodos(todos);
};

module.exports = {
  getTodosSync,
  getTodoSync,
  createTodoSync,
  updateTodoSync,
  deleteTodoSync,
};
