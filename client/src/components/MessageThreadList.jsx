import avatarPerson from "../assets/avatar-person.svg";

export default function MessageThreadList(props) {
  function getImageUrl(name) {
    if (!name) {
      return avatarPerson;
    }
    return new URL(`../assets/${name}`, import.meta.url).href;
  }

  function isActive(thread) {
    if (!props.activeThread) {
      return false;
    }
    return thread.id === props.activeThread.id;
  }

  function getMostRecentContent(thread) {
    return thread.messages[thread.messages.length - 1]?.content ?? "";
  }

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {props.threads.map((thread) => (
        <li
          key={thread.id}
          className={`cursor-pointer p-3 sm:pb-4 rounded ${
            isActive(thread) ? "bg-blue-400" : ""
          }`}
          onClick={() => props.onSelect(thread.id)}
          data-testid="threadItem"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={getImageUrl(thread.patient.photo)}
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
  );
}
