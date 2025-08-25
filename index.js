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
  fs.writeFileSync(dbPath, JSON.stringify(todos, null, 2), "utf-8");
};

// ✅ getTodosSync: return todos in string
const getTodosSync = () => {
  return fs.readFileSync(dbPath, "utf-8");
};

// ✅ getTodoSync: return one todo as string
const getTodoSync = (id) => {
  const todos = readTodos();
  const todo = todos.find((t) => t.id === id);
  return todo ? JSON.stringify(todo) : null;
};

// ✅ createTodoSync: push new todo
const createTodoSync = (todo) => {
  const todos = readTodos();
  todos.push(todo);
  writeTodos(todos);
  return "Todo created";
};

// ✅ updateTodoSync: fix logic here
const updateTodoSync = (id, data) => {
  const todos = readTodos();
  const idx = todos.findIndex((t) => t.id === id);

  if (idx === -1) return "Todo not found";

  // agar title diya hai → update title
  if (data.title !== undefined) {
    todos[idx].title = data.title;
  }

  // agar completed diya hai → update completed
  if (data.completed !== undefined) {
    todos[idx].completed = data.completed;
  }

  writeTodos(todos);
  return "Todo updated";
};

// ✅ deleteTodoSync
const deleteTodoSync = (id) => {
  const todos = readTodos();
  const filtered = todos.filter((t) => t.id !== id);
  writeTodos(filtered);
  return "Todo deleted";
};
