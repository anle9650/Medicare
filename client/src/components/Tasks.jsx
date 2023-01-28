import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import Task from "./Task";
import taskData from "../data/tasks.json";

export default function Tasks() {
  const [tasks, setTasks] = useState(getTasks());
  const [addingTask, setAddingTask] = useState(false);

  function getTasks() {
    return taskData;
  }

  function addTask(task) {
    setTasks((prevTasks) => {
        const id = prevTasks.length + 1;
        const newTask = { ...task, id };
        return [newTask, ...prevTasks];
    });
  }

  function updateTask(updatedTask) {
    setTasks((oldTasks) =>
      oldTasks.map((oldTask) =>
        oldTask.id === updatedTask.id ? updatedTask : oldTask
      )
    );
  }

  function deleteTask(taskToDelete) {
    setTasks((oldTasks) => oldTasks.filter((task) => task !== taskToDelete));
  }

  return (
    <>
      <div className="bg-white rounded p-4">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-bold">Tasks</h3>
          <span className="font-bold ml-auto">New Tasks</span>
          <button
            className="border border-gray-300 rounded px-2 py-1 ml-2"
            onClick={() => setAddingTask(true)}
          >
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        {tasks.map((task, index) => (
          <Task
            key={task.id}
            {...task}
            className={index === tasks.length - 1 ? "" : "mb-4"}
            onUpdate={(updatedTask) => updateTask(updatedTask)}
            onDelete={() => deleteTask(task)}
          />
        ))}
      </div>
      <AddTaskModal
        open={addingTask}
        onAdd={(task) => addTask(task)}
        onClose={() => setAddingTask(false)}
      />
    </>
  );
}
