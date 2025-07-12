import { useTodos } from "./hooks";
import "./App.css";
import { AddForm, FiltredForm, TodoList } from "./components";
import { AppContext } from "./context";

export const App = () => {
  const todos = useTodos();
  const { isLoading, handleAddTodo } = todos;

  return (
    <AppContext value={todos}>
      <div className="app">
        <h1>Список дел:</h1>
        <FiltredForm />
        {isLoading ? <Loader /> : <TodoList />}
        <AddForm onSave={handleAddTodo} />
      </div>
    </AppContext>
  );
};
