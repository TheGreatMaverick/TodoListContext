import { useState } from 'react';

export const useHandleEditTodo = (setTodosList) => {
    const [editTodo, setEditTodo] = useState(null);
    const [editText, setEditText] = useState("");

    const handleEditTodo = (id, newText) => {
        fetch(`http://localhost:3000/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({ text: newText }),
        })
          .then((response) => response.json())
          .then((updatedTodo) => {
            setTodosList((prevTodos) =>
              prevTodos.map((todo) =>
                todo.id === id ? { ...todo, text: updatedTodo.text } : todo
              )
            );
            setEditTodo(null);
          })
          .catch((error) => console.error("Ошибка:", error));
      };

      return {editTodo, setEditTodo, handleEditTodo, editText, setEditText};
};