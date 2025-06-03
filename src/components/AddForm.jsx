import React, { useState } from "react";

export const AddForm = ({ onSave }) => {
  const [todoValue, setTodoValue] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsCreating(true);
    await onSave(todoValue);
    setIsCreating(false);
    setTodoValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Введите новое дело"
        value={todoValue}
        onChange={(e) => setTodoValue(e.target.value)}
      />
      <button disabled={isCreating} type="submit">
        Добавить дело
      </button>
    </form>
  );
};
