import { useState } from "react";
import threadData from "../data/threads.json";
import MessageThreadList from "./MessageThreadList";
import MessageThread from "./MessageThread";
import avatarPerson from "../assets/avatar-person.svg";

export default function Messages() {
  const [threads, setThreads] = useState(getThreads());
  const [activeThreadId, setActiveThreadId] = useState(threads[0]?.id ?? null);
  const activeThread = threads.find((thread) => thread.id === activeThreadId);
  const [showNewThread, setShowNewThread] = useState(threads.length === 0);

  const newThread = (
    <div
      className={`flex items-center space-x-4 px-3 py-5 rounded cursor-pointer ${
        activeThreadId ? "" : "bg-blue-400"
      }`}
      onClick={() => setActiveThreadId(null)}
    >
      <div className="flex-shrink-0">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={avatarPerson}
          alt="User avatar"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`font-medium truncate dark:text-white ${
            activeThreadId ? "text-gray-900" : "text-white"
          }`}
        >
          New Message
        </p>
      </div>
      <button
        className={`dark:text-white ${
          activeThreadId ? "text-gray-500" : "text-white"
        }`}
        onClick={() => setShowNewThread(false)}
      >
        x
      </button>
    </div>
  );

  function getThreads() {
    return threadData;
  }

  function startNewThread() {
    setShowNewThread(true);
    setActiveThreadId(null);
  }

  function addMessage(newMessage) {
    setThreads((prevThreads) =>
      prevThreads.map((thread) => {
        if (thread.id === activeThread.id) {
          return {
            ...thread,
            messages: [...thread.messages, newMessage],
          };
        }
        return thread;
      })
    );
  }

  return (
    <section className="h-full grid grid-cols-2 gap-1">
      <div className="bg-white p-3 rounded">
        <div className="flex justify-end mb-2">
          <button
            className="hover:bg-slate-100 px-2 py-1 rounded"
            onClick={startNewThread}
            data-testid="newThreadButton"
          >
            <i className="far fa-edit text-slate-500 text-lg"></i>
          </button>
        </div>
        {showNewThread && newThread}
        {threads.length && <hr />}
        <MessageThreadList
          threads={threads}
          activeThread={activeThread}
          onSelect={(selectedThreadId) => setActiveThreadId(selectedThreadId)}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex bg-white p-4 rounded">
          <button>{"<"}</button>
          {activeThread?.patient && (
            <span className="ml-3">{activeThread.patient.name}</span>
          )}
          <button className="ml-auto">...</button>
        </div>
        <MessageThread
          {...activeThread}
          onSendMessage={addMessage}
          className="grow"
        />
      </div>
    </section>
  );
}
