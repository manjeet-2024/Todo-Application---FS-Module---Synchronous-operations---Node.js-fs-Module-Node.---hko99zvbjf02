const fs = require("fs");
const path = require("path");

// db.txt ka exact path
const dbPath = path.join(__dirname, "db.txt");

// helper → read todos
const readTodos = () => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, "[]", "utf-8");
  }
  const data = fs.readFileSync(dbPath, "utf-8");
  let todos;
  try {
    todos = JSON.parse(data || "[]");
  } catch (e) {
    todos = [];
  }
  // ensure always array
  if (!Array.isArray(todos)) {
    todos = [todos];
  }
  return todos;
};

// helper → write todos
const writeTodos = (todos) => {
  fs.writeFileSync(dbPath, JSON.stringify(todos), "utf-8");
};

// 1. return db.txt contents in string format
const getTodosSync = () => {
  if (!fs.existsSync(dbPath)) return "[]";
  return fs.readFileSync(dbPath, "utf-8");
};

// 2. return respective todo in string format
const getTodoSync = (id) => {
  const todos = readTodos();
  const todo = todos.find((t) => String(t.id) === String(id));
  return todo ? JSON.stringify(todo) : null;
};

// 3. create todo
const createTodoSync = (todo) => {
  const todos = readTodos();
  todos.push(todo);
  writeTodos(todos);
  return todo;
};

// 4. update todo's title OR mark completed
const updateTodoSync = (id, updates) => {
  const todos = readTodos();
  const index = todos.findIndex((t) => String(t.id) === String(id));
  if (index !== -1) {
    todos[index] = { ...todos[index], ...updates };
    writeTodos(todos);
    return todos[index];
  }
  return null;
};

// 5. delete todo
const deleteTodoSync = (id) => {
  const todos = readTodos();
  const filtered = todos.filter((t) => String(t.id) !== String(id));
  writeTodos(filtered);
  return todos.length !== filtered.length; // true if deleted
};

module.exports = {
  getTodosSync,
  getTodoSync,
  createTodoSync,
  updateTodoSync,
  deleteTodoSync,
};
