import { useState } from "react";

export const useHandleDeleteTodo = (setTodosList) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteTodo = (id) => {
        fetch(`http://localhost:3000/todos/${id}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (response.ok) {
              setTodosList(prevTodos => prevTodos.filter(todo => todo.id !== id));
            } else {
              console.error('Не удалось удалить задачу');
            }
          })
          .catch(error => console.error('Ошибка при удалении задачи:', error))
          .finally(() => setIsDeleting(false));
      };
    return {
        isDeleting, handleDeleteTodo
    }
};