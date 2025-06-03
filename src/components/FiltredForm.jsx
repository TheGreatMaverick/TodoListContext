import React from "react";

export const FiltredForm = ({ search, setSearch, isSorting, setIsSorting}) => {
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
