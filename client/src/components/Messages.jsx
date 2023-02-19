import MessageThread from "./MessageThread";
import threadData from "../data/threads.json";
import { useState } from "react";
import MessageThreadList from "./MessageThreadList";

export default function Messages() {
  const [threads, setThreads] = useState(getThreads());
  const [activeThreadIndex, setActiveThreadIndex] = useState(0);
  const activeThread = threads[activeThreadIndex] ?? null;

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
      <MessageThreadList threads={threads} activeThread={activeThread} />
      <div className="flex flex-col">
        <div className="flex bg-white p-4 rounded">
          <button>{"<"}</button>
          <span className="ml-3">Damilola Oyin</span>
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
