import { useState } from "react";
import BaseDatepicker from "./BaseDatepicker";
import BaseModal from "./BaseModal";

export default function TaskEditModal(props) {
  const [task, setTask] = useState({ content: "", deadline: "" });

  function updateTask(event) {
    const { name, value } = event.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  }

  function setDeadline(deadline) {
    setTask((prevTask) => ({ ...prevTask, deadline }));
  }

  function addTask(event) {
    event.preventDefault();

    if (!task.content || !task.deadline) {
      return;
    }

    props.onAdd({ ...task });
    setTask({ content: "", deadline: null });
    props.onClose();
  }

  return (
    <BaseModal open={props.open} onClose={props.onClose}>
      <BaseModal.Header>Add Task</BaseModal.Header>
      <BaseModal.Body>
        <div className="flex flex-col justify-between h-[32rem] mt-2">
          <form id="taskForm" onSubmit={addTask} data-testid="form">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="content"
              name="content"
              value={task.content}
              onChange={updateTask}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
            <label
              htmlFor="deadline"
              className="block text-sm font-medium text-gray-700 mt-3"
            >
              Deadline
            </label>
            <BaseDatepicker
              name="deadline"
              value={task.deadline}
              onSelect={(date) => setDeadline(date)}
              data-testid="datepicker"
            />
          </form>
        </div>
      </BaseModal.Body>
      <BaseModal.Footer>
        <button
          type="submit"
          form="taskForm"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Save
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={props.onClose}
        >
          Cancel
        </button>
      </BaseModal.Footer>
    </BaseModal>
  );
}
