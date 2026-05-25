import { useState, useEffect } from "react";
import "../App.css";

export const TaskDetail = () => {
  let [selectedTask, setSelectedTask] = useState(null);

  const selectedTaskId = "4f310604-82b5-4afd-b9a4-ddf12dfac0a3";
  const boardId = "13923117-72de-4788-a7f0-4c42f162a5ab";

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

  return (
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
  );
};
