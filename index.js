const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "db.txt");

// Helper: Read all todos as array
function readTodos() {
  if (!fs.existsSync(dbPath)) return [];
  const data = fs.readFileSync(dbPath, "utf-8").trim();
  if (!data) return [];
  return data.split("\n").map(line => JSON.parse(line));
}

// Helper: Write todos back to db.txt
function writeTodos(todos) {
  const data = todos.map(todo => JSON.stringify(todo)).join("\n");
  fs.writeFileSync(dbPath, data + (data ? "\n" : ""), "utf-8");
}

// 1. Get all todos (raw file content)
const getTodosSync = () => {
  if (!fs.existsSync(dbPath)) return "";
  return fs.readFileSync(dbPath, "utf-8");
};

// 2. Get a single todo by ID (raw JSON string)
const getTodoSync = (id) => {
  const todos = readTodos();
  const todo = todos.find(t => t.id == id); // allow number or string
  return todo ? JSON.stringify(todo) : null;
};

// 3. Create a new todo
const createTodoSync = (title) => {
  const now = new Date().toISOString();
  const todo = {
    id: Date.now(),
    title,
    isCompleted: false,
    createdAt: now,
    updatedAt: now,
  };

  fs.appendFileSync(dbPath, JSON.stringify(todo) + "\n", "utf-8");
  return todo;
};

// 4. Update an existing todo (return raw JSON string)
const updateTodoSync = (id, updates) => {
  const todos = readTodos();
  const index = todos.findIndex(t => t.id == id);
  if (index === -1) return null;

  todos[index] = {
    ...todos[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  writeTodos(todos);
  return JSON.stringify(todos[index]);
};

// 5. Delete a todo (return true if deleted, false otherwise)
const deleteTodoSync = (id) => {
  const todos = readTodos();
  const filtered = todos.filter(t => t.id != id);
  const deleted = filtered.length !== todos.length;
  writeTodos(filtered);
  return deleted;
};

module.exports = {
  getTodosSync,
  getTodoSync,
  createTodoSync,
  updateTodoSync,
  deleteTodoSync,
};
