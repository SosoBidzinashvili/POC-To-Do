import React, { useEffect, useState } from "react";
import styles from "./App.module.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const text = newTask.trim();
    if (!text) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, dueDate: newDueDate || null }),
      });
      const created = await res.json();
      if (!res.ok) {
        console.error("Failed to create task", created);
        return;
      }
      setTasks((prev) => [...prev, created]);
      setNewTask("");
      setNewDueDate("");
    } catch (error) {
      console.error("Error creating task", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleTask = async (taskId, completed) => {
    const previous = tasks;
    const updatedOptimistic = tasks.map((task) =>
      task.id === taskId ? { ...task, completed } : task
    );
    setTasks(updatedOptimistic);

    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
      if (!res.ok) {
        setTasks(previous);
      }
    } catch (error) {
      console.error("Error updating task", error);
      setTasks(previous);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const previous = tasks;
    const updatedOptimistic = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedOptimistic);

    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!res.ok && res.status !== 404) {
        setTasks(previous);
      }
    } catch (error) {
      console.error("Error deleting task", error);
      setTasks(previous);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  const formatDueLabel = (dueDate) => {
    if (!dueDate) return null;

    const parts = dueDate.split("-");
    if (parts.length !== 3) return dueDate;

    const [yearStr, monthStr, dayStr] = parts;
    const year = Number(yearStr);
    const month = Number(monthStr);
    const day = Number(dayStr);
    if (!year || !month || !day) return dueDate;

    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const due = new Date(year, month - 1, day);
    const diffMs = due.getTime() - todayStart.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";

    const dd = String(day).padStart(2, "0");
    const mm = String(month).padStart(2, "0");
    return `${dd}.${mm}.${year}`;
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>My To-Do List</h1>
          <p className={styles.subtitle}>Stay organized and get things done</p>
        </header>

        <form className={styles.inputRow} onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Add a new task..."
            className={styles.input}
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            disabled={isSubmitting}
          />
          <input
            type="date"
            className={styles.dateInput}
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className={styles.addButton}
            disabled={isSubmitting || !newTask.trim()}
          >
            + Add
          </button>
        </form>

        <main className={styles.listContainer}>
          {isLoading ? (
            <div className={styles.emptyState}>Loading tasks...</div>
          ) : totalTasks === 0 ? (
            <div className={styles.emptyState}>No tasks yet. Add one above!</div>
          ) : (
            <ul className={styles.list}>
              {tasks.map((task) => (
                <li key={task.id} className={styles.listItem}>
                  <label className={styles.taskContent}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={(e) =>
                        handleToggleTask(task.id, e.target.checked)
                      }
                      className={styles.checkbox}
                    />
                    <div className={styles.taskTextGroup}>
                      <span
                        className={
                          task.completed
                            ? `${styles.taskText} ${styles.completed}`
                            : styles.taskText
                        }
                      >
                        {task.text}
                      </span>
                      {formatDueLabel(task.dueDate) && (
                        <div className={styles.dueRow}>
                          <span className={styles.dueIcon}>📅</span>
                          <span className={styles.dueText}>
                            {formatDueLabel(task.dueDate)}
                          </span>
                        </div>
                      )}
                    </div>
                  </label>
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleDeleteTask(task.id)}
                    aria-label={`Delete ${task.text}`}
                  >
                    🗑
                  </button>
                </li>
              ))}
            </ul>
          )}
        </main>

        <footer className={styles.footer}>
          {totalTasks === 0 ? (
            <span>No tasks yet</span>
          ) : (
            <span>
              {completedTasks} of {totalTasks} tasks completed
            </span>
          )}
        </footer>
      </div>
    </div>
  );
}

export default App;

