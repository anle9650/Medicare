import { useEffect } from "react";
import { useState } from "react";
import messageData from "../data/messages.json";
import Message from "./Message";

export default function MessageThread(props) {
  const [messages, setMessages] = useState(getMessages());
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    const thread = document.querySelector("#thread");
    thread.scrollTop = thread.scrollHeight;
  }, [messages]);

  function getMessages() {
    return messageData;
  }

  function updateMessageContent(event) {
    setMessageContent(event.target.value);
  }

  function sendMessage() {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages[prevMessages.length - 1].id + 1,
        type: "outgoing",
        content: messageContent.trim(),
      },
    ]);

    setMessageContent("");
  }

  return (
    <div className="flex flex-col">
      <div className="flex bg-white p-4 rounded">
        <button>{"<"}</button>
        <span className="ml-3">Damilola Oyin</span>
        <button className="ml-auto">...</button>
      </div>
      <div className="grow flex flex-col bg-white p-3 rounded mt-1">
        <div
          id="thread"
          className="max-h-[78vh] overflow-y-auto"
          data-testid="thread"
        >
          {messages.map((message, index) => (
            <Message
              key={message.id}
              {...message}
              className={index === 0 ? "" : "mt-2"}
            />
          ))}
        </div>
        <div className="flex relative mt-auto">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <i className="fa fa-pen text-slate-400"></i>
          </div>
          <input
            type="text"
            id="message-input"
            value={messageContent}
            className="grow p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write a message..."
            onChange={updateMessageContent}
            data-testid="messageInput"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              className="bg-indigo-600 text-white text-sm p-1 px-2.5 rounded-full hover:bg-indigo-700 disabled:bg-indigo-500"
              onClick={sendMessage}
              disabled={!messageContent.trim()}
              data-testid="sendButton"
            >
              <i className="fas fa-arrow-up"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
