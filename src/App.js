import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  const inputOnChange = (e) => {
    setTodo(e.target.value);
  };

  const DeleteOnClick = (id) => {
    const deleteItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(deleteItem);
  };

  const formOnSubmit = (e) => {
    console.log(todo);
    e.preventDefault();
    if (todo !== "") {
      setTodos([...todos, { id: uuidv4(), text: todo.trim() }]);
      console.log(todos);
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
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>再投稿</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>編集</button>
            )}
            <button onClick={() => DeleteOnClick(todo.id)}>削除</button>
            <select>
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
      </ul>
    </div>
  );
};

export default App;
