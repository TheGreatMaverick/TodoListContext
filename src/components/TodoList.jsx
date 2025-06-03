import React from "react";
import { TodoItem } from "./TodoItem";

export const TodoList = ({ todosList, handleDeleteTodo, handleEditTodo }) => {
  return (
    <>
      <ul className="todo-list">
        {todosList.map((todo) => (
          <TodoItem
            onDelete={handleDeleteTodo}
            key={todo.id}
            {...todo}
            onEdit={handleEditTodo}
          />
        ))}
      </ul>
    </>
  );
};
