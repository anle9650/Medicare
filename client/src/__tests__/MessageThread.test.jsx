import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MessageThread from "../components/MessageThread";

describe("MessageThread", () => {
  it("should show the sent message in the thread when the user clicks send", () => {
    const MESSAGE = "new message";
    render(<MessageThread />);

    const messageInput = screen.getByTestId("messageInput");
    fireEvent.change(messageInput, { target: { value: MESSAGE } });

    const sendButton = screen.getByTestId("sendButton");
    fireEvent.click(sendButton);

    const thread = screen.getByTestId("thread");
    expect(thread.textContent).toContain(MESSAGE);
  });

  it("should disable the send button if the message content is empty", () => {
    const MESSAGE = "";
    render(<MessageThread />);

    const messageInput = screen.getByTestId("messageInput");
    fireEvent.change(messageInput, { target: { value: MESSAGE } });

    const sendButton = screen.getByTestId("sendButton");
    expect(sendButton.disabled).toBeTruthy();
  });
});
