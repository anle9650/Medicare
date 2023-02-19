import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Messages from "../components/Messages";

const MOCK_MESSAGE = {
    id: 10,
    type: "outgoing",
    content: "test message"
};

vi.mock("../components/MessageThread", () => ({
    default: vi.fn((props) => (
        <>
            <ul data-testid="thread">
                {props.messages.map(message => (
                    <li key={message.id}>{message.content}</li>
                ))}
            </ul>
            <button onClick={() => props.onSendMessage(MOCK_MESSAGE)}>Send</button>
        </>
    ))
}))

describe("Messages", () => {
    it("should add the new message to the active thread when a message is sent", () => {
        render(<Messages />)
        const sendButton = screen.getByText("Send");
        fireEvent.click(sendButton, MOCK_MESSAGE);

        const thread = screen.getByTestId("thread");
        expect(thread.textContent).toContain(MOCK_MESSAGE.content);
    })
})