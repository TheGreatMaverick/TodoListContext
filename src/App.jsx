// Пункт задания #1. 

// Реализовать приложение на базе Create React App — страницу со списком дел (Todo list):
// содержание одного дела — небольшой текст;
// использовать JSON Placeholder с ручкой (endpoint) «todos»;
// реализовать только вывод списка;
// дизайн на усмотрение разработчика (но должен быть аккуратный, приятный на вид).

// import { useEffect, useState } from "react";
// import "./App.css"; 

// export const App = () => {
//   const [todosList, setTodosList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setIsLoading(true);

//     fetch("https://jsonplaceholder.typicode.com/todos")
//       .then((loadedData) => loadedData.json())
//       .then((loadedTodos) => {
//         setTodosList(loadedTodos);
//       })
//       .finally(() => setIsLoading(false));
//   }, []);

//   const toggleComplete = (id) => {
//     setTodosList((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   };

//   return (
//     <div className="app">
//       <h1>Список дел:</h1>

//       {isLoading ? (
//         <div className="loader-container">
//           <div className="loader"></div>
//         </div>
//       ) : (
//         <ul className="todo-list">
//           {todosList.map(({ id, title, completed }) => (
//             <li 
//               key={id} 
//               className={`todo-item ${completed ? "completed" : ""}`}
//               onClick={() => toggleComplete(id)}
//             >
//               {title}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// Пункт задания #2.
// Переделать приложение, заменив JSON Placeholder на JSON Server:
// начальный список дел отсутствует (пустой массив);
// реализовать CRUD-операции, добавить возможность добавления, изменения и удаления дела;
// реализовать поиск дел по заданной фразе (для нахождения элемента в тексте дела должен быть совпадающий с введенной фразой фрагмент);
// реализовать кнопку для включения режима сортировки дел по алфавиту, если кнопка не нажата — изначальная сортировка (т. е. отсутствие сортировки).

import { useGetTodos, useHandleAddTodo, useHandleEditTodo, useHandleDeleteTodo, useHandleFilteredAndSortedTodos, } from './hooks'
import "./App.css";

export const App = () => {
  const {isLoading, todosList, setTodosList} = useGetTodos();
  
  const {isCreating, handleAddTodo, addTodo, setAddTodo} = useHandleAddTodo(setTodosList);
  const {searchTodo, setSearchTodo, addSort, setAddSort, handleFilteredAndSortedTodos, toggleComplete} = useHandleFilteredAndSortedTodos(todosList, setTodosList);
  const {editTodo, setEditTodo, handleEditTodo, editText, setEditText} = useHandleEditTodo(setTodosList);
  const {isDeleting, handleDeleteTodo} = useHandleDeleteTodo(setTodosList)

  return (
    <div className="app">
      <h1>Список дел:</h1>
      <button onClick={() => setAddSort(!addSort)}>
        {addSort ? "Отключить сортировку" : "Сортировать по алфавиту"}
      </button>
      <input 
        type="text" 
        placeholder="Поиск задачи..." 
        value={searchTodo} 
        onChange={(e) => setSearchTodo(e.target.value)} 
      />
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <ul className="todo-list">
          {handleFilteredAndSortedTodos().map(({ id, text, completed }) => (
            <li 
              key={id} 
              className={`todo-item ${completed ? "completed" : ""}`} 
              onClick={() => toggleComplete(id)}
            >
              {editTodo === id ? (
                <>
                  <input 
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button className="save" onClick={() => handleEditTodo(id, editText)}>✅</button>
                </>
              ) : (
                <>
                  {text}
                  <div className="button-group">
                    <button className="edit"
                    onClick={() => {
                      setEditTodo(id);
                      setEditText(text);
                      }}>✏️</button>
                    <button disabled={isDeleting} className="delete" onClick={() => handleDeleteTodo(id)}>🗑</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      <input 
        placeholder="Введите новое дело"
        value={addTodo} 
        onChange={(e) => setAddTodo(e.target.value)} 
      />
      <button disabled={isCreating} onClick={handleAddTodo}>Добавить дело</button>
    </div>
  )
}