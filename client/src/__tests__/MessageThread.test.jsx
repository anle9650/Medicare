import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MessageThread from "../components/MessageThread";

const THREAD = {
  id: 1,
  patient: {
    name: "Damilola Oyin",
    photo: "damilola.png"
  },
  messages: [
    {
      id: 1,
      type: "outgoing",
      content: "Hello, how are you doing?",
    },
    {
      id: 2,
      type: "incoming",
      content: "Great, when can we have the meeting?",
    },
    {
      id: 3,
      type: "outgoing",
      content: "Are you available right now?",
    },
    {
      id: 4,
      type: "incoming",
      content: "Yeah, let's have a video call.",
    },
    {
      id: 5,
      type: "outgoing",
      content: "That would be great.",
    },
  ],
};

describe("MessageThread", () => {
  it("should call props.onSendMessage with the message when a message is sent", () => {
    const MESSAGE_CONTENT = "new message";
    const messageHandler = vi.fn();
    render(<MessageThread {...THREAD} onSendMessage={messageHandler} />);

    const messageInput = screen.getByTestId("messageInput");
    fireEvent.change(messageInput, { target: { value: MESSAGE_CONTENT } });

    const sendButton = screen.getByTestId("sendButton");
    fireEvent.click(sendButton);

    expect(messageHandler).toHaveBeenCalledWith(
      expect.objectContaining({ content: MESSAGE_CONTENT })
    );
  });

  it("should disable the send button if the message content is empty", () => {
    const MESSAGE_CONTENT = "";
    render(<MessageThread {...THREAD} />);

    const messageInput = screen.getByTestId("messageInput");
    fireEvent.change(messageInput, { target: { value: MESSAGE_CONTENT } });

    const sendButton = screen.getByTestId("sendButton");
    expect(sendButton.disabled).toBeTruthy();
  });
});
