import { useEffect, useState } from "react";
import Todo from "../../Shared/Todo";

const Incompleted = ({ todos }) => {
  const [inompletedTodos, setInCompletedTodos] = useState([]);

  useEffect(() => {
    setInCompletedTodos(todos.filter((todo) => todo.checked === false));
  }, [todos]);

  return (
    <div className="incompleted todosList p-4">
      <div className="text-center">
        <h3>
          InCompleted List :{" "}
          <bold className="todosLength">({inompletedTodos?.length}) </bold>{" "}
        </h3>
      </div>
      {inompletedTodos.map((todo) => (
        <Todo {...todo} key={todo.id}></Todo>
      ))}
    </div>
  );
};

export default Incompleted;
