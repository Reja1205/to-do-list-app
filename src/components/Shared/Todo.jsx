import { useContext, useState } from "react";
import { AiFillDelete, AiOutlineFieldTime } from "react-icons/ai";
import { FcEditImage } from "react-icons/fc";
import { MdDateRange, MdRadioButtonUnchecked } from "react-icons/md";
import { TodoContext } from "../../App";
import ModalComp from "../Ui/ModalComp";
import moment from "moment";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";

const Todo = ({ id, names, dates, times, checked }) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:00");
  // const [todos, setTodos] = useState([]);
  const { todos, setTodos } = useContext(TodoContext);

  const [error, setError] = useState([]);

  const handleSubmit = (e, _id) => {
    e.preventDefault();
    if (name && time) {
      setTodos(
        todos.map((todo) => {
          if (todo.id === _id) {
            return {
              ...todo,
              names: name,
              dates: moment(date).format("MM/DD/YYYY"),
              times: moment(time, "hh:mm:ss").format("hh:mm:a"),
            };
          }
          return todo;
        })
      );
      setName("");
      setDate("");
      setTime("");
      setShowModal(false);
      setError("");
    } else {
      setError("Provide name and time");
    }
  };

  // console.log("Todos from todo component", todos);

  /**
   * @description ckeck and do it completed
   */
  const handleCheck = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      })
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (_id) => {
    if (id === _id) {
      setShowModal(true);
    }
  };

  return (
    <div className="todo mt-4">
      <div className="todoItems">
        <div>
          <p className={`todoNames ${checked ? "checked" : ""}`}>{names}</p>
        </div>

        <div className="todoIconBox">
          <button
            onClick={() => handleEdit(id)}
            data-toggle="tooltip"
            data-placement="top"
            title="Edit"
            className="iconeBtn doneBtn"
          >
            <FcEditImage className="todoIcon"></FcEditImage>
          </button>
          <button
            onClick={() => handleCheck(id)}
            data-toggle="tooltip"
            data-placement="top"
            title="Done"
            className="iconeBtn doneBtn"
          >
            <MdRadioButtonUnchecked className="todoIcon"></MdRadioButtonUnchecked>
          </button>
          <button
            onClick={() => handleDelete(id)}
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
            className="iconeBtn"
          >
            <AiFillDelete
              className="todoIcons"
              style={{ color: "rgb(209,19,19)" }}
            ></AiFillDelete>
          </button>
        </div>
      </div>
      <div className="todoDetail">
        <div className="todoTimes">
          <p>
            <MdDateRange></MdDateRange>
            {dates}
          </p>
        </div>
        <div className="todoTimes">
          <p>
            <AiOutlineFieldTime></AiOutlineFieldTime>
            {times === "Invalid date" ? "invalid Time" : times}
          </p>
        </div>
      </div>
      <ModalComp showModal={showModal} setShowModal={setShowModal}>
        <div className="modalBox">
          <div className="text-center mb-3 p-2">
            <h3>Edit Todo</h3>
          </div>
          <form onSubmit={(e) => handleSubmit(e, id)}>
            <div className="text-center">
              <input
                type="text"
                name="name"
                className="todoName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the todo name"
              />
            </div>
            <div className="datePicker mt-3 p-2">
              <p>
                <MdDateRange></MdDateRange>Pick a date
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                />
              </p>
            </div>
            <div className="timePicker">
              <p>
                <AiOutlineFieldTime></AiOutlineFieldTime>Pick a time
                <TimePicker
                  onChange={(time) => setTime(time)}
                  value={time}
                  selected={time}
                  amPmAriaLabel
                  closeClock={true}
                  disableClock={true}
                  format="h:m: a"
                  hourPlaceholder="hh"
                  minutePlaceholder="mm"
                  secondPlaceholder="ss"
                  // clearIcon={false}
                  className="date"
                />
              </p>
            </div>
            <div className="text-center mt-5 p-2">
              <button
                type="submit"
                value="Add Todo"
                className="btn w-100 add-btn submit-btn p-2"
              >
                Add Todo
              </button>
            </div>
          </form>
          {error && (
            <div className="text-center ">
              <p className="error" style={{ color: "red" }}>
                {error}
              </p>
            </div>
          )}
        </div>
      </ModalComp>
    </div>
  );
};

export default Todo;
