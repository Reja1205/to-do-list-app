import { useContext, useState } from "react";
import { BsListUl } from "react-icons/bs";
import { CgCalendarNext } from "react-icons/cg";
import { FcTodoList } from "react-icons/fc";
import { GrStatusInfo } from "react-icons/gr";
import { IoMdToday } from "react-icons/io";
import { MdAdd, MdDateRange } from "react-icons/md";
import ModalComp from "../../Ui/ModalComp";
// Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Time Picker
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import TimePicker from "react-time-picker";
import { AiOutlineFieldTime } from "react-icons/ai";
import moment from "moment";
import Today from "../Today/Today";
import AllTodos from "../AllTodos/AllTodos";
import Status from "../Status/Status";
import { TodoContext } from "../../../App";
import Next7Days from "../Next7Days/Next7Days";

export default function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:00");
  // const [todos, setTodos] = useState([]);
  const { todos, setTodos } = useContext(TodoContext);

  const [error, setError] = useState([]);
  const [showUi, setShowUi] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && time) {
      setTodos([
        ...todos,
        {
          id: Math.ceil(Math.random() * 1000),
          names: name,
          dates: moment(date).format("MM/DD/YYYY"),
          times: moment(time, "hh:mm:ss").format("hh:mm:a"),
          checked: false,
        },
      ]);
      setName("");
      setDate("");
      setTime("");
      setShowModal(false);
      setError("");
    } else {
      setError("Provide name and time");
    }
  };
  // console.log("Todos", showUi);

  return (
    <div style={{ display: "flex" }}>
      <div className="sidebar">
        <div className="sidebar-box">
          <div className="text-center">
            <p className="todos-of">
              {" "}
              <FcTodoList /> Todos of
            </p>
            <button className="btn add btn" onClick={() => setShowModal(true)}>
              {" "}
              <MdAdd /> Make A Todo
            </button>
            <div className="todoBox-container">
              <div className="todosOf_item">
                <div>
                  <a
                    className="  px-4 py-2 todosOf_items todosOf_item-today"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowUi("Today");
                    }}
                  >
                    {" "}
                    <IoMdToday /> Today
                  </a>
                </div>
                <div>
                  <a
                    className=" px-4 py-2 todosOf_items todosOf_item--next"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowUi("Next 7 Days");
                    }}
                  >
                    {" "}
                    <CgCalendarNext /> Next 7 Days
                  </a>
                </div>
                <div>
                  <a
                    className="px-4 py-2 todosOf_items todosOf_item--all"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowUi("Show All");
                    }}
                  >
                    {" "}
                    <BsListUl /> Show All
                  </a>
                </div>
                <div>
                  <a
                    className=" px-4 py-2 todosOf_items todosOf_item--staus"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowUi("Status");
                    }}
                  >
                    {" "}
                    <GrStatusInfo /> Status
                  </a>
                </div>
              </div>
            </div>
          </div>

          {showModal && (
            <ModalComp showModal={showModal} setShowModal={setShowModal}>
              <div className="modalBox">
                <div className="text-center mb-3 p-2">
                  <h3>Add a new todo</h3>
                </div>
                <form onSubmit={handleSubmit}>
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
          )}
        </div>
      </div>
      <div className="todosBox">
        {showUi === "Today" && <Today todos={todos}></Today>}
        {showUi === "Next 7 Days" && <Next7Days></Next7Days>}
        {showUi === "Show All" && <AllTodos todos={todos}></AllTodos>}
        {showUi === "Status" && <Status todos={todos}></Status>}
      </div>
    </div>
  );
}
