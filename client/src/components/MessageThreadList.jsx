import photo from "../assets/damilola.png";

export default function MessageThreadList(props) {
  function isActive(thread) {
    return thread.id === props.activeThread.id;
  }

  function getMostRecentContent(thread) {
    return thread.messages[thread.messages.length - 1]?.content ?? "";
  }

  return (
    <div className="bg-white p-3 rounded">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {props.threads.map((thread) => (
          <li
            key={thread.id}
            className={`cursor-pointer p-3 sm:pb-4 rounded ${
              isActive(thread) ? "bg-blue-400" : ""
            }`}
            data-testid="threadItem"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src={photo}
                  alt={thread.patient.name}
                />
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
    </div>
  );
}
