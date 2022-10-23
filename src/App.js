import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [sortTodos, setSortTodos] = useState([]);
  const [showNotStartedTodo, setShowNotStartedTodo] = useState(false);
  const [showProgressionTodo, setShowProgressionTodo] = useState(false);
  const [showCompletedTodo, setShowCompletedTodo] = useState(false);

  const inputOnChange = (e) => {
    setTodo(e.target.value);
  };

  const DeleteOnClick = (id) => {
    const deleteItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(deleteItem);
    if (showNotStartedTodo) {
      sortNotStarted(deleteItem);
    } else if (showProgressionTodo) {
      sortProgression(deleteItem);
    } else if (showCompletedTodo) {
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
    setShowCompletedTodo(false);
    setShowNotStartedTodo(true);
    setShowProgressionTodo(false);
  };
  const sortProgression = (sortTodos) => {
    const progression = sortTodos.filter((todo) => {
      if (todo.status === "進行中") {
        return todo;
      }
    });
    setSortTodos(progression);
    setShowCompletedTodo(false);
    setShowNotStartedTodo(false);
    setShowProgressionTodo(true);
  };
  const sortCompleted = (sortTodos) => {
    const todoComplete = sortTodos.filter((todo) => {
      if (todo.status === "完了") {
        return todo;
      }
    });
    setSortTodos(todoComplete);
    setShowCompletedTodo(true);
    setShowNotStartedTodo(false);
    setShowProgressionTodo(false);
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
        {showNotStartedTodo || showProgressionTodo || showCompletedTodo ? (
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
                    if (showNotStartedTodo) {
                      sortNotStarted(todos);
                    } else if (showProgressionTodo) {
                      sortProgression(todos);
                    } else if (showCompletedTodo) {
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
          setShowCompletedTodo(false);
          setShowProgressionTodo(false);
          setShowNotStartedTodo(false);
        }}
      >
        すべて
      </button>
    </div>
  );
};

export default App;
