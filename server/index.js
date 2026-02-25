import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let nextId = 1;
let tasks = [
  {
    id: nextId++,
    text: "Buy groceries",
    completed: false,
    dueDate: null,
  },
  {
    id: nextId++,
    text: "Walk the dog",
    completed: true,
    dueDate: null,
  },
  {
    id: nextId++,
    text: "Finish project report",
    completed: false,
    dueDate: null,
  },
];

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { text, dueDate } = req.body;
  if (!text || typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ error: "Task text is required" });
  }

  const newTask = {
    id: nextId++,
    text: text.trim(),
    completed: false,
    dueDate: typeof dueDate === "string" && dueDate.trim() ? dueDate : null,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.patch("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (typeof req.body.completed === "boolean") {
    task.completed = req.body.completed;
  }

  if ("dueDate" in req.body) {
    const { dueDate } = req.body;
    task.dueDate =
      typeof dueDate === "string" && dueDate.trim() ? dueDate : null;
  }

  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const [deleted] = tasks.splice(index, 1);
  res.json(deleted);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

