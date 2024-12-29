/* eslint-disable react/prop-types */
import { useContext } from "react";
import Todo from "../../Shared/Todo";
import { TodoContext } from "../../../App";

const AllTodos = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="allTodos todosList p-4">
      <div className="text-center mb-4">
        <h3>
          Your Todos List :{" "}
          <bold className="todosLength">( {todos?.length}) </bold>{" "}
        </h3>
      </div>
      {todos.map((todo) => (
        <Todo {...todo} key={todo.id}></Todo>
      ))}
    </div>
  );
};

export default AllTodos;
