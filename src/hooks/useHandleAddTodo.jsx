import { useState } from 'react';

export const useHandleAddTodo = (setTodosList) => {
     const [isCreating, setIsCreating] = useState(false);
     const [addTodo, setAddTodo] = useState("");

     const handleAddTodo = () => {
        setIsCreating(true);
        
    if (addTodo.trim() === "") return;
        fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ 
                text: addTodo, 
                completed: false 
            }),
            })
            .then((response) => response.json())
            .then((newTodo) => {
                console.log("добавлено:", newTodo);
                setTodosList((prevTodos) => [...prevTodos, newTodo]);
                setAddTodo("");
            })
            .catch((error) => console.error("Ошибка:", error))
            .finally(() => setIsCreating(false));
     };

    return {
        isCreating,
        handleAddTodo,
        addTodo,
        setAddTodo
    }
};