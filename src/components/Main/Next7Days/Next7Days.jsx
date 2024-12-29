import { useContext } from "react";

import Todo from "../../Shared/Todo";
import { TodoContext } from "./../../../App";

const Next7Days = () => {
  const { todos } = useContext(TodoContext);

  // console.log("Next 7 Days Todos:", next7DaysTodos);

  const filterTodosForNextSevenDays = (todos) => {
    const today = new Date();

    today.setHours(0, 0, 0, 0); // Normalize to start of the day
    console.log(today.setHours(0, 0, 0, 0));

    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7);
    sevenDaysLater.setHours(23, 59, 59, 999); // Normalize to end of the day
    console.log(sevenDaysLater.setHours(23, 59, 59, 999));

    return todos.filter((todo) => {
      // filter method always return a new array
      console.log("each todo", todo);

      const todoDate = new Date(todo.dates); // Parse the date string into date object and take the date from the todo
      console.log("Each todo date", todoDate);

      if (isNaN(todoDate)) {
        return false;
      }

      return todoDate >= today && todoDate <= sevenDaysLater; //
    });
  };

  const result = filterTodosForNextSevenDays(todos); //result is a array of object

  return (
    <div className="next-7-days todoList p-4">
      <div className="text-center">
        <h3>
          Next 7 Days List :{" "}
          <bold className="todosLength">({result?.length}) </bold>{" "}
        </h3>
      </div>
      {result.map((todo) => (
        <Todo {...todo} key={todo.id}></Todo>
      ))}
    </div>
  );
};

export default Next7Days;
