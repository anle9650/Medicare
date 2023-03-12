import PatientPhoto from "./PatientPhoto";

export default function MessageThreadList(props) {
  function isActive(thread) {
    if (!props.activeThread) {
      return false;
    }
    return thread.patient._id === props.activeThread.patient._id;
  }

  function getMostRecentContent(thread) {
    return thread.messages[thread.messages.length - 1]?.content ?? "";
  }

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {props.threads.map((thread) => (
        <li
          key={thread.patient._id}
          className={`cursor-pointer p-3 sm:pb-4 rounded ${
            isActive(thread) ? "bg-blue-400" : ""
          }`}
          onClick={() => props.onSelect(thread.patient._id)}
          data-testid="threadItem"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <PatientPhoto {...thread.patient} />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`font-medium truncate dark:text-white ${
                  isActive(thread) ? "text-white" : "text-gray-900"
                }`}
              >
                {thread.patient.name}
              </p>
              <p
                className={`text-sm truncate ${
                  isActive(thread)
                    ? "text-white"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {getMostRecentContent(thread)}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
