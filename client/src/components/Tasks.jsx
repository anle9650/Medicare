import { useState } from "react";
import Task from "./Task";
import taskData from "../data/tasks.json";

export default function Tasks() {
  const [tasks, setTasks] = useState(getTasks());

  function getTasks() {
    return taskData;
  }

  function updateTask(updatedTask) {
    setTasks((oldTasks) =>
      oldTasks.map((oldTask) =>
        oldTask.id === updatedTask.id ? updatedTask : oldTask
      )
    );
  }

  return (
    <div className="bg-white rounded p-4">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-bold">Tasks</h3>
        <span className="font-bold ml-auto">New Tasks</span>
        <button className="border border-gray-300 rounded px-1.5 ml-2">
          +
        </button>
      </div>
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          {...task}
          className={index === tasks.length - 1 ? "" : "mb-4"}
          onUpdate={(updatedTask) => updateTask(updatedTask)}
        />
      ))}
    </div>
  );
}
