import { useState } from "react";
import "./Todo.css";
import { v4 as uuidv4 } from "uuid";

export default function TodoApp() {
  let [todos, setTodos] = useState([{ task: "sample task", id: uuidv4() }]);
  let [newtodo, setNewTodo] = useState("");

  let addNewTodo = () => {
    if (!newtodo.trim()) {
      return;
    }

    setTodos((prevTodos) => [
      ...prevTodos,
      { task: newtodo.trim(), id: uuidv4() },
    ]);
    setNewTodo("");
  };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id != id));
  };

  let upperCaseAll = () => {
    setTodos(() =>
      todos.map((todo) => ({
        ...todo,
        task: todo.task.toUpperCase(),
      })),
    );
  };

  return (
    <main main className="todo-app">
      <section className="todo-card">
        <div className="todo-header">
          <p className="todo-eyebrow">Today</p>
          <h1>Todo App</h1>
        </div>

        <div className="todo-input-row">
          <input
            type="text"
            className="todo-input"
            placeholder="Place your todo"
            aria-label="Todo input"
            value={newtodo}
            onChange={updateTodoValue}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addNewTodo();
              }
            }}
          />
          <button type="button" className="todo-button" onClick={addNewTodo}>
            Add Todo
          </button>
        </div>

        <div className="todo-list-wrap">
          <h2>Todo Items</h2>
          <ul className="todo-list">
            {todos.map((todo) => (
              <li className="todo-item" key={todo.id}>
                <span className="todo-text">{todo.task}</span>
                <button
                  type="button"
                  className="todo-delete-button"
                  onClick={() => deleteTodo(todo.id)}
                >
                  delete
                </button>
              </li>
            ))}
          </ul>

          <button onClick={upperCaseAll}>Update All to UpperCase</button>
        </div>
      </section>
    </main>
  );
}
