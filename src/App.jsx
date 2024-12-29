import { createContext, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

export const TodoContext = createContext();

function App() {
  const [todos, setTodos] = useState(() => {
    const fromLocalStorage = localStorage.getItem("todos");
    return fromLocalStorage ? JSON.parse(fromLocalStorage) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <Header></Header>
      <Main></Main>
    </TodoContext.Provider>
  );
}

export default App;
