import React, { useContext } from "react";
import { TodoItem } from "./TodoItem";
import { AppContext } from "../context";

export const TodoList = () => {
  const { todosList, handleDeleteTodo, handleEditTodo } =
    useContext(AppContext);
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
