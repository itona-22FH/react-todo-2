import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [sortTodos, setSortTodos] = useState([]);
  const [todoSortNotStarted, setTodoSortNotStarted] = useState(false);
  const [todoSortProgression, setTodoSortProgression] = useState(false);
  const [todoSortCompleted, setTodoSortCompleted] = useState(false);

  const inputOnChange = (e) => {
    setTodo(e.target.value);
  };

  const DeleteOnClick = (id) => {
    const deleteItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(deleteItem);
    if (todoSortNotStarted) {
      sortNotStarted(deleteItem);
    } else if (todoSortProgression) {
      sortProgression(deleteItem);
    } else if (todoSortCompleted) {
      sortCompleted(deleteItem);
    }
  };

  const formOnSubmit = (e) => {
    e.preventDefault();
    if (todo !== "") {
      setTodos([
        ...todos,
        { id: uuidv4(), text: todo.trim(), status: "未着手" },
      ]);
    } else {
      alert("何か文字を入力してください");
    }
    setTodo("");
  };
  const submitEdits = (id) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updateTodos);
    setTodoEditing(null);
    setEditingText("");
  };

  const setStatus = (todo, status) => {
    todo.status = status;
  };

  const sortNotStarted = (sortTodos) => {
    const notStarted = sortTodos.filter((todo) => {
      if (todo.status === "未着手") {
        return todo;
      }
    });
    setSortTodos(notStarted);
    setTodoSortCompleted(false);
    setTodoSortNotStarted(true);
    setTodoSortProgression(false);
  };
  const sortProgression = (sortTodos) => {
    const progression = sortTodos.filter((todo) => {
      if (todo.status === "進行中") {
        return todo;
      }
    });
    setSortTodos(progression);
    setTodoSortCompleted(false);
    setTodoSortNotStarted(false);
    setTodoSortProgression(true);
  };
  const sortCompleted = (sortTodos) => {
    const todoComplete = sortTodos.filter((todo) => {
      if (todo.status === "完了") {
        return todo;
      }
    });
    setSortTodos(todoComplete);
    setTodoSortCompleted(true);
    setTodoSortNotStarted(false);
    setTodoSortProgression(false);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={formOnSubmit}>
        <input
          type="text"
          name="todo"
          value={todo}
          onChange={inputOnChange}
        ></input>
        <button type="Submit">追加</button>
      </form>
      <ul>
        {todoSortNotStarted || todoSortProgression || todoSortCompleted ? (
          <>
            {sortTodos.map((todo) => (
              <li key={todo.id}>
                {todo.text}
                {todo.id === todoEditing ? (
                  <button onClick={() => submitEdits(todo.id)}>再投稿</button>
                ) : (
                  <button onClick={() => setTodoEditing(todo.id)}>編集</button>
                )}
                <button onClick={() => DeleteOnClick(todo.id)}>削除</button>
                <select
                  onChange={(e) => {
                    setStatus(todo, e.target.value);
                    if (todoSortNotStarted) {
                      sortNotStarted(todos);
                    } else if (todoSortProgression) {
                      sortProgression(todos);
                    } else if (todoSortCompleted) {
                      sortCompleted(todos);
                    }
                  }}
                  defaultValue={todo.status}
                >
                  <option>未着手</option>
                  <option>進行中</option>
                  <option>完了</option>
                </select>
                {todo.id === todoEditing ? (
                  <input
                    type="text"
                    placeholder="編集内容を入力"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) : (
                  <div>{""}</div>
                )}
              </li>
            ))}
          </>
        ) : (
          <>
            <h2>すべてのタスク</h2>
            {todos.map((todo) => (
              <li key={todo.id}>
                {todo.text}
                {todo.id === todoEditing ? (
                  <button onClick={() => submitEdits(todo.id)}>再投稿</button>
                ) : (
                  <button onClick={() => setTodoEditing(todo.id)}>編集</button>
                )}
                <button onClick={() => DeleteOnClick(todo.id)}>削除</button>
                <select
                  onChange={(e) => setStatus(todo, e.target.value)}
                  defaultValue={todo.status}
                >
                  <option>未着手</option>
                  <option>進行中</option>
                  <option>完了</option>
                </select>
                {todo.id === todoEditing ? (
                  <input
                    type="text"
                    placeholder="編集内容を入力"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) : (
                  <div>{""}</div>
                )}
              </li>
            ))}
          </>
        )}
      </ul>

      <button
        onClick={() => {
          sortNotStarted(todos);
        }}
      >
        未着手
      </button>
      <button
        onClick={() => {
          sortProgression(todos);
        }}
      >
        進行中
      </button>
      <button
        onClick={() => {
          sortCompleted(todos);
        }}
      >
        完了
      </button>
      <button
        onClick={() => {
          setTodoSortCompleted(false);
          setTodoSortProgression(false);
          setTodoSortNotStarted(false);
        }}
      >
        すべて
      </button>
    </div>
  );
};

export default App;
