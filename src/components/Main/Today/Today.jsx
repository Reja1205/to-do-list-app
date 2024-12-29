import moment from "moment";
import { useEffect, useState } from "react";
import Todo from "../../Shared/Todo";

// eslint-disable-next-line react/prop-types
const Today = ({ todos }) => {
  const date = new Date();
  const todaysDate = moment(date).format("MM/DD/YYYY");
  const [todaysTodos, setTodaysTodos] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    setTodaysTodos(todos.filter((todo) => todo.dates === todaysDate));
  }, [todos]);

  return (
    <div className="today TodosList p-4">
      <div className="text-center">
        <h3>Today&apos;s Todos</h3>
      </div>
      {todaysTodos?.length > 0 &&
        todaysTodos.map((todo) => <Todo {...todo} key={todo.id}></Todo>)}
    </div>
  );
};

export default Today;
