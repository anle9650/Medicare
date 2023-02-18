import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Message from "../components/Message";

describe("Message", () => {
    it("should show the message in blue if it is outgoing", () => {
        const OUTGOING_MESSAGE = {
            type: "outgoing",
            content: "outgoing message"
        };
        render(<Message {...OUTGOING_MESSAGE} />);
        const messageBubble = screen.getByText(OUTGOING_MESSAGE.content);
        expect(messageBubble.className).toContain('sky');
    })

    it("should show the message in grey if it is incoming", () => {
        const INCOMING_MESSAGE = {
            type: "incoming",
            content: "incoming message"
        };
        render(<Message {...INCOMING_MESSAGE} />);
        const messageBubble = screen.getByText(INCOMING_MESSAGE.content);
        expect(messageBubble.className).toContain('slate');
    })
})