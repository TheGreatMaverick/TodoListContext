import { useState } from "react";

export const useHandleFilteredAndSortedTodos = (todosList, setTodosList) => {
    const [searchTodo, setSearchTodo] = useState("");
    const [addSort, setAddSort] = useState(false);

    const toggleComplete = (id) => {
        setTodosList((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      };

    const handleFilteredAndSortedTodos = () => {
        let filtered = todosList.filter((todo) =>
        todo.text.trim().toLowerCase().includes(searchTodo.toLowerCase())
        );
    
        if (addSort) {
        return [...filtered].sort((a, b) => a.text.localeCompare(b.text));
        }
        return filtered;
    };

    return {searchTodo, setSearchTodo, addSort, setAddSort, handleFilteredAndSortedTodos, toggleComplete}
};