import React, { useContext } from "react";
import { AppContext } from "../context";

export const FiltredForm = () => {
  const { search, setSearch, isSorting, setIsSorting } = useContext(AppContext);
  return (
    <>
      <button onClick={() => setIsSorting(!isSorting)}>
        {isSorting ? "Отключить сортировку" : "Сортировать по алфавиту"}
      </button>
      <input
        type="text"
        placeholder="Поиск задачи..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
};
