import { useState } from "react";
import AllTodos from "../AllTodos/AllTodos";
import Completed from "./Completed";
import Incompleted from "./Incompleted";

const Status = ({ todos }) => {
  const [status, setStatus] = useState("");

  const handleClick = (e) => {
    if (e.target.value === "All") {
      setStatus("All");
    }
    if (e.target.value === "Completed") {
      setStatus("Completed");
    }
    if (e.target.value === "Incompleted") {
      setStatus("Incompleted");
    }
  };
  return (
    <>
      <div className="text-center todoList p-4">
        <select className="form-select" onClick={handleClick}>
          <option selected>Please choose an option</option>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incompleted">Incompleted</option>
        </select>

        <div className="allTask">
          {status === "All" && <AllTodos todos={todos}></AllTodos>}
          {status === "Completed" && <Completed todos={todos}></Completed>}
          {status === "Incompleted" && (
            <Incompleted todos={todos}></Incompleted>
          )}
        </div>
      </div>
    </>
  );
};

export default Status;
