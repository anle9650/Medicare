import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MessageThreadList from "../components/MessageThreadList";

const THREADS = [
  {
    _id: 1,
    patient: {
      _id: 1,
      name: "Damilola Oyin",
      photo: "damilola.png",
    },
    messages: [
      {
        _id: 1,
        type: "outgoing",
        content: "Hello, how are you doing?",
      },
      {
        _id: 2,
        type: "incoming",
        content: "Great, when can we have the meeting?",
      },
      {
        _id: 3,
        type: "outgoing",
        content: "Are you available right now?",
      },
      {
        _id: 4,
        type: "incoming",
        content: "Yeah, let's have a video call.",
      },
      {
        _id: 5,
        type: "outgoing",
        content: "That would be great.",
      },
    ],
  },
  {
    _id: 2,
    patient: {
      _id: 2,
      name: "Henry Archuleta",
      photo: "henry.png",
    },
    messages: [
      {
        _id: 6,
        type: "incoming",
        content: "Hey doc, do you have a second to discuss my test results?",
      },
      {
        _id: 7,
        type: "outgoing",
        content: "Sure Henry. Did you have any specific questions?",
      },
      {
        _id: 8,
        type: "incoming",
        content:
          "Just wondering what my elevanted HgA1c means, and how I can treat it?",
      },
      {
        _id: 9,
        type: "outgoing",
        content:
          "Your HgA1c represents an elevation of insulin hormone. It means that you are in the pre-diabetic stage. You should work on decreasing your sugar/carb intake, overall caloric intake, and aim for 20 minutes of moderate cardiovascular exercise per day.",
      },
      {
        _id: 10,
        type: "incoming",
        content: "Thanks doc!",
      },
    ],
  },
];

describe("MessageThreadList", () => {
  it("should highlight the active message thread in blue", () => {
    const ACTIVE_THREAD = THREADS[1];
    render(
      <MessageThreadList threads={THREADS} activeThread={ACTIVE_THREAD} />
    );
    const threadItems = screen.getAllByTestId("threadItem");

    const activeThreadItems = threadItems.filter((threadItem) =>
      threadItem.className.includes("blue")
    );

    expect(activeThreadItems.length).toBe(1);
    expect(activeThreadItems[0].textContent).toContain(
      ACTIVE_THREAD.patient.name
    );
  });

  it("should call props.onSelect with the selected thread id when a thread is selected", () => {
    const SELECTED_THREAD = THREADS[1];
    const selectHandler = vi.fn();

    render(
      <MessageThreadList threads={THREADS} onSelect={selectHandler} />
    );

    const threadItems = screen.getAllByTestId("threadItem");
    const selectedThreadItem = threadItems.find(threadItem => threadItem.textContent.includes(SELECTED_THREAD.patient.name));
    fireEvent.click(selectedThreadItem);
    expect(selectHandler).toHaveBeenCalledWith(SELECTED_THREAD.patient._id);
  });
});
