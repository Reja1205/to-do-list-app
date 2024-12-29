import { useEffect, useState } from "react";
import Todo from "../../Shared/Todo";

const Completed = ({ todos }) => {
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    setCompletedTodos(todos.filter((todo) => todo.checked === true));
  }, [todos]);

  return (
    <div className="completed todosList p-4">
      <div className="text-center">
        <h3>
          Completed List :{" "}
          <bold className="todosLength">({completedTodos?.length}) </bold>{" "}
        </h3>
      </div>
      {completedTodos.map((todo) => (
        <Todo {...todo} key={todo.id}></Todo>
      ))}
    </div>
  );
};

export default Completed;
