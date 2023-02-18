import { useState } from "react";
import messageData from "../data/messages.json";
import Message from "./Message";

export default function Messages() {
  const [messages, setMessages] = useState(getMessages());

  function getMessages() {
    return messageData;
  }

  return (
      <section className="h-full grid grid-cols-2 gap-1">
        <div className="bg-white p-3 rounded">Messages</div>
        <div className="flex flex-col">
            <div className="flex bg-white p-4 rounded">
              <button>{"<"}</button>
              <span className="ml-3">Damilola Oyin</span>
              <button className="ml-auto">...</button>
            </div>
            <div className="grow bg-white p-3 rounded mt-1">
              {messages.map((message, index) => (
                <Message {...message} className={index === 0 ? "" : "mt-2"} />
              ))}
            </div>
        </div>
      </section>
  );
}
