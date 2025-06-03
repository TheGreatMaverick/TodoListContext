import React, { useMemo } from "react";
import { useState, useEffect } from "react";

export const useTodos = () => {
  const [todosList, setTodosList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [search, setSearch] = useState("");

  const sorting = useMemo(() => {
    const filtred = search
      ? todosList.filter((todo) =>
          todo.text.toLowerCase().includes(search.toLowerCase())
        )
      : todosList;
    if (isSorting) {
      return [...filtred].sort((a, b) => a.text.localeCompare(b.text));
    }
    return filtred;
  }, [isSorting, todosList, search]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const loadedTodos = await fetch("http://localhost:3000/todos").then(
      (loadedData) => loadedData.json()
    );
    setTodosList(loadedTodos);
    setIsLoading(false);
  };

  const handleAddTodo = async (text) => {
    if (text.trim() === "") return;
    const newTodo = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        text: text,
        completed: false,
      }),
    }).then((response) => response.json());
    setTodosList((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleDeleteTodo = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    });
    setTodosList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = async (updatedTodo) => {
    const updated = await fetch(
      `http://localhost:3000/todos/${updatedTodo.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(updatedTodo),
      }
    ).then((response) => response.json());

    setTodosList((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updated.id ? updated : todo))
    );
  };

  return {
    isLoading,
    todosList: sorting,
    fetchTodos,
    handleAddTodo,
    handleDeleteTodo,
    handleEditTodo,
    setIsSorting,
    isSorting,
    setSearch,
    search,
  };
};
