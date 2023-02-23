import { useState } from "react";
import threadData from "../data/threads.json";
import MessageThreadList from "./MessageThreadList";
import MessageThread from "./MessageThread";
import avatarPerson from "../assets/avatar-person.svg";
import PatientLookup from "./PatientLookup";
import PatientPhoto from "./PatientPhoto";

export default function Messages() {
  const [threads, setThreads] = useState(getThreads());
  const [activeThreadId, setActiveThreadId] = useState(threads[0]?.id ?? null);
  const activeThread = threads.find((thread) => thread.id === activeThreadId);
  const [showNewThread, setShowNewThread] = useState(threads.length === 0);

  function getThreads() {
    return threadData;
  }

  function startNewThread() {
    setShowNewThread(true);
    setActiveThreadId(null);
  }

  function endNewThread(event) {
    event.stopPropagation();
    setShowNewThread(false);
    setActiveThreadId(threads[0]?.id ?? null);
  }

  function addThread(patient) {
    const existingThread = threads.find(
      (thread) => thread.patient.id === patient.id
    );

    if (existingThread) {
      setActiveThreadId(existingThread.id);
      setShowNewThread(false);
      return;
    }

    const newThread = {
      id: threads.length + 1,
      patient,
      messages: [],
    };

    setThreads((prevThreads) => [newThread, ...prevThreads]);
    setActiveThreadId(newThread.id);
    setShowNewThread(false);
  }

  function addMessage(newMessage) {
    const updatedThread = {
      ...activeThread,
      messages: [...activeThread.messages, newMessage],
    };

    setThreads((prevThreads) => [
      updatedThread,
      ...prevThreads.filter((thread) => thread.id !== activeThreadId),
    ]);
  }

  const newThread = (
    <>
      <div
        className={`flex items-center space-x-4 p-3 rounded cursor-pointer ${
          activeThread ? "" : "bg-blue-400"
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
              activeThread ? "text-gray-900" : "text-white"
            }`}
          >
            New Message
          </p>
        </div>
        {threads.length && !activeThread && (
          <button
            className="dark:text-white text-white"
            onClick={endNewThread}
            data-testid="closeNewThreadButton"
          >
            x
          </button>
        )}
      </div>
      {threads.length && <hr />}
    </>
  );

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
        <MessageThreadList
          threads={threads}
          activeThread={activeThread}
          onSelect={(selectedThreadId) => setActiveThreadId(selectedThreadId)}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex bg-white p-4 rounded">
          {activeThread?.patient ? (
            <div className="flex items-center">
              <PatientPhoto {...activeThread.patient} />
              <span className="ml-2">{activeThread.patient.name}</span>
            </div>
          ) : (
            <PatientLookup
              placeholder="Choose recepient"
              onSelect={(selectedPatient) => addThread(selectedPatient)}
            />
          )}
          <button className="ml-auto">...</button>
        </div>
        <MessageThread
          {...activeThread}
          onSendMessage={addMessage}
          className="grow mt-1"
        />
      </div>
    </section>
  );
}
