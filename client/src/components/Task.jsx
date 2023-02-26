import TaskDropdown from "./TaskDropdown";
import { updateTaskRequest, deleteTaskRequest } from "../services/TaskService";

export default function Task(props) {
  async function handleChange(event) {
    const { name, type, value, checked } = event.target;

    const updatedTask = {
      ...props,
      [name]: type === "checkbox" ? checked : value,
    };

    const success = await updateTask(updatedTask);

    if (success) {
      props.onUpdate(updatedTask);
    }
  }

  async function updateTask(task) {
    const response = await updateTaskRequest(task);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const updatedTask = await response.json();
    return !!updatedTask;
  }

  async function deleteTask() {
    const response = await deleteTaskRequest(props._id);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const deletedTask = await response.json();

    if (deletedTask) {
      props.onDelete();
    }
  }

  return (
    <div className={`bg-gray-100 rounded p-4 ${props.className}`}>
      <label className="grid grid-cols-12 items-center gap-x-3 cursor-pointer">
        <input
          type="checkbox"
          name="completed"
          checked={props.completed}
          onChange={handleChange}
          className="border-gray-300 rounded p-3"
          data-testid="completedCheckbox"
        />
        <div className="col-span-7">
          <span className="font-bold">
            {props.completed ? "Successfully Completed" : "Not completed"}
          </span>
          <p>{props.content}</p>
        </div>
        <span className="italic col-span-3">
          {new Date(props.deadline).toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        <TaskDropdown onDelete={deleteTask} />
      </label>
    </div>
  );
}
