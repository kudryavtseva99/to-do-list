import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let [selectedTaskId, setSelectedTaskId] = useState(null);
  let [selectedTask, setSelectedTask] = useState(null);
  let [tasks, setTasks] = useState(null);
  let [boardId, setBoardId] = useState(null);

  useEffect(() => {
    console.log("effect");
    fetch("https://trelly.it-incubator.app/api/1.0/boards/tasks", {
      headers: {
        "api-key": "599e0fa5-4b4a-412d-b9fd-e509a0a227c4",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setTasks(json.data);
      });
  }, []);

  useEffect(() => {
    if (!selectedTaskId || !boardId) {
      setSelectedTask(null);
      return;
    }

    setSelectedTask(null);

    fetch(
      "https://trelly.it-incubator.app/api/1.0/boards/" +
        boardId +
        "/tasks/" +
        selectedTaskId,
      {
        headers: {
          "api-key": "599e0fa5-4b4a-412d-b9fd-e509a0a227c4",
        },
      },
    )
      .then((res) => res.json())
      .then((json) => {
        setSelectedTask(json.data);
      });
  }, [selectedTaskId, boardId]);

  const priorityColors = [
    "#ffffff",
    "#ffd7b5",
    "#ffb38a",
    "#ff9248",
    "#ff6700",
  ];

  if (tasks === null) {
    return (
      <div>
        <strong>... Загрузка</strong>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div>
        <strong>Задачи отсутствуют</strong>
      </div>
    );
  }

  return (
    <>
      {" "}
      <h1 className="toDoList">Список дел</h1>
      <button
        className="resetTaskBorder"
        onClick={() => {
          setSelectedTaskId(null);
          setSelectedTask(null);
          setBoardId(null);
        }}
      >
        Сбсросить выделение
      </button>
      <div className="flexContainer">
        <ul>
          {tasks.map(
            (
              task,
              // : {
              // id: number;
              // title: string;
              // isDone: boolean;
              // addedAt: string;
              // priority: number;
              // }
            ) => (
              <li
                key={task.id}
                style={{
                  background:
                    priorityColors[task.attributes.priority] ?? "black",
                  border:
                    task.id === selectedTaskId
                      ? "2px solid blue"
                      : "2px solid transparent",
                  marginBottom: "10px",
                  padding: "8px",
                  color: "black",
                }}
              >
                <div
                  onClick={() => {
                    setSelectedTaskId(task.id);
                    setBoardId(task.attributes.boardId);
                  }}
                >
                  {" "}
                  <div>
                    <strong>Задача:</strong>{" "}
                    <span
                      style={{
                        textDecoration:
                          task.attributes.status === 2
                            ? "line-through"
                            : "none",
                      }}
                    >
                      {task.attributes.title}
                    </span>
                  </div>
                  <div>
                    <strong>Статус:</strong>{" "}
                    <input
                      type="checkbox"
                      checked={task.attributes.status === 2}
                      readOnly
                    />
                  </div>
                  <div>
                    <strong>Дата создания задачи:</strong>{" "}
                    {new Date(task.attributes.addedAt).toLocaleDateString()}
                  </div>
                </div>
              </li>
            ),
          )}
        </ul>
        <div className="taskDetails">
          <h2>Task details</h2>
          {!selectedTaskId && <p>Task is not selected</p>}
          {selectedTaskId &&
            (!selectedTask || selectedTaskId !== selectedTask.id) && (
              <p>...Loading</p>
            )}
          {selectedTask && selectedTaskId === selectedTask.id && (
            <ul className="taskDetailsList">
              <li>Title: {selectedTask.attributes.title}</li>

              <li>Board title: {selectedTask.attributes.boardTitle}</li>

              <li>
                Description:{" "}
                {selectedTask.attributes.description ?? "no description"}
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
