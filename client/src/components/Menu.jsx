import { useState } from "react";

export default function Menu(props) {
  const [selected, setSelected] = useState("dashboard");

  function getClass(value) {
    if (value === selected) {
      return "text-indigo-600 font-bold";
    }
    return "text-gray-500";
  }

  function updateSelected(selected) {
    setSelected(selected);
    props.onSelect(selected);
  }

  return (
    <aside className="bg-white w-64 h-full border-r" aria-label="Sidebar">
      <div className="px-3 py-4 overflow-y-auto">
        <h2 className="uppercase text-gray-400 text-sm p-2">Menu</h2>
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className={`flex items-center p-2 text-base font-normal ${getClass(
                "dashboard"
              )} rounded-lg hover:bg-gray-100`}
              onClick={() => updateSelected("dashboard")}
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span className="ml-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center p-2 text-base font-normal ${getClass(
                "patients"
              )} rounded-lg hover:bg-gray-100`}
              onClick={() => updateSelected("patients")}
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Patients</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center p-2 text-base font-normal ${getClass(
                "messages"
              )} rounded-lg hover:bg-gray-100`}
              onClick={() => updateSelected("messages")}
            >
              <i className="fas fa-envelope ml-1" />
              <span className="flex-1 ml-3 whitespace-nowrap">Messages</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center p-2 text-base font-normal ${getClass(
                "schedule"
              )} rounded-lg hover:bg-gray-100`}
              onClick={() => updateSelected("schedule")}
            >
              <i className="fas fa-calendar ml-1" />
              <span className="flex-1 ml-3 whitespace-nowrap">Schedule</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center p-2 text-base font-normal ${getClass(
                "tasks"
              )} rounded-lg hover:bg-gray-100`}
              onClick={() => updateSelected("tasks")}
            >
              <i className="fas fa-tasks ml-1" />
              <span className="flex-1 ml-3 whitespace-nowrap">Tasks</span>
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-300">
                3
              </span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
