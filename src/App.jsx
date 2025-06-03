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

import { useTodos } from "./hooks";
import "./App.css";
import { AddForm, FiltredForm, TodoList } from "./components";

export const App = () => {
  const {
    isLoading,
    todosList,
    handleAddTodo,
    handleDeleteTodo,
    handleEditTodo,
    isSorting,
    setIsSorting,
    search,
    setSearch,
  } = useTodos();

  return (
    <div className="app">
      <h1>Список дел:</h1>
      <FiltredForm
        search={search}
        setSearch={setSearch}
        isSorting={isSorting}
        setIsSorting={setIsSorting}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <TodoList
          todosList={todosList}
          handleDeleteTodo={handleDeleteTodo}
          handleEditTodo={handleEditTodo}
        />
      )}
      <AddForm onSave={handleAddTodo} />
    </div>
  );
};
