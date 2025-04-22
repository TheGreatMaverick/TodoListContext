import { useEffect, useState } from "react";

export const useGetTodos = () => {
    const [todosList, setTodosList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(() => { 
        setIsLoading(true);
    
        fetch("http://localhost:3000/todos")
          .then((loadedData) => loadedData.json())
          .then((loadedTodos) => {
            console.log("Данные с сервера:", loadedTodos);
            setTodosList(loadedTodos);
          })
          .finally(() => setIsLoading(false));
      }, []);

      return {
        isLoading,
        todosList,
        setTodosList,
      }
};