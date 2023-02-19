import MessageThread from "./MessageThread";
import threadData from "../data/threads.json";
import { useState } from "react";
import MessageThreadList from "./MessageThreadList";

export default function Messages() {
  const [threads, setThreads] = useState(getThreads());
  const [activeThreadId, setActiveThreadId] = useState(threads[0]?.id ?? null);
  const activeThread = threads.find((thread) => thread.id === activeThreadId);

  function getThreads() {
    return threadData;
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
      <MessageThreadList
        threads={threads}
        activeThread={activeThread}
        onSelect={(selectedThreadId) => setActiveThreadId(selectedThreadId)}
      />
      <div className="flex flex-col">
        <div className="flex bg-white p-4 rounded">
          <button>{"<"}</button>
          <span className="ml-3">{activeThread.patient.name}</span>
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
