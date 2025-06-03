import React, { useRef, useState } from "react";

export const TodoItem = ({ onDelete, id, text, completed, onEdit }) => {
  const [editTodo, setEditTodo] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const inputRef = useRef(null);

  const handleDelete = async (id) => {
    setIsDeleting(true);

    try {
      await onDelete(id);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggle = async () => {
    if (disabled || editTodo) return;
    setDisabled(true);
    await onEdit({ id, completed: !completed });
    setDisabled(false);
  };

  const handleEditTodo = async (event) => {
    event.stopPropagation();
    if (!editTodo) return setEditTodo(true);
    setDisabled(true);
    await onEdit({ id, text: inputRef.current.value });
    setDisabled(false);
    setEditTodo(false);
  };

  return (
    <li
      className={`todo-item ${completed ? "completed" : ""}`}
      onClick={handleToggle}
    >
      {editTodo ? (
        <div className="edit-todo">
          <input
            className="edit-input"
            type="text"
            ref={inputRef}
            defaultValue={text}
          />
          <button className="save" disabled={disabled} onClick={handleEditTodo}>
            ✅
          </button>
        </div>
      ) : (
        <>
          <span
            className="todo-text" /*onClick={(e) => e.stopPropagation()} останавливаем всплытие если не хотим чтобы срабатывал toggle по нажатию на сам текст*/
          >
            {text}
          </span>
          <div className="button-group">
            <button className="edit" onClick={handleEditTodo}>
              ✏️
            </button>
            <button
              disabled={isDeleting}
              className="delete"
              onClick={() => handleDelete(id)}
            >
              🗑
            </button>
          </div>
        </>
      )}
    </li>
  );
};
