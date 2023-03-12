import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Messages from "../components/Messages";
import threadData from "../data/threads.json";
import patientData from "../data/patients.json";

const MOCK_MESSAGE = {
  _id: -1,
  type: "outgoing",
  content: "test message",
};

vi.mock("../services/MessageService", () => ({
  fetchThreads: vi.fn(() => ({
    json: () => new Promise((resolve) => resolve(threadData)),
    ok: true,
  })),
}));

vi.mock("../services/PatientService", () => ({
  fetchPatients: vi.fn(() => ({
    json: () => new Promise((resolve) => resolve(patientData)),
    ok: true,
  })),
}));

vi.mock("../components/MessageThreadList", () => ({
  default: vi.fn((props) => (
    <ul data-testid="threadList">
      {props.threads.map((thread) => (
        <li
          key={thread.patient._id}
          data-testid="threadListItem"
          onClick={() => props.onSelect(thread.patient._id)}
        >
          {thread.messages[thread.messages.length - 1].content}
        </li>
      ))}
    </ul>
  )),
}));

vi.mock("../components/MessageThread", () => ({
  default: vi.fn((props) => (
    <>
      <ul data-testid="activeThread">
        {props.messages?.map((message) => (
          <li key={message._id}>{message.content}</li>
        ))}
      </ul>
      <button onClick={() => props.onSendMessage(MOCK_MESSAGE)}>Send</button>
    </>
  )),
}));

describe("Messages", () => {
  it("should show the 'New Message' thread if new thread is started", async () => {
    render(<Messages />);
    await act(() => Promise.resolve());
    const newThreadButton = screen.getByTestId("newThreadButton");
    await act(() => fireEvent.click(newThreadButton));
    expect(await screen.findByText('New Message'));
  });

  it("should hide the 'New Message' thread if the close button is clicked", async () => {
    render(<Messages />);
    await act(() => Promise.resolve());

    const newThreadButton = screen.getByTestId("newThreadButton");
    fireEvent.click(newThreadButton);

    const closeNewThreadButton = screen.getByTestId("closeNewThreadButton");
    fireEvent.click(closeNewThreadButton);

    expect(screen.queryByText('New Message')).toBeNull();
  });

  it("should make the first thread active if the 'New Message' thread is closed", async () => {
    render(<Messages />);
    await act(() => Promise.resolve());

    const newThreadButton = screen.getByTestId("newThreadButton");
    fireEvent.click(newThreadButton);

    const closeNewThreadButton = screen.getByTestId("closeNewThreadButton");
    fireEvent.click(closeNewThreadButton);

    const threadListItems = screen.getAllByTestId('threadListItem');
    const messageFromFirstThread = threadListItems[0].textContent;
    const activeThread = screen.getByTestId("activeThread");
    
    expect(activeThread.textContent).toContain(messageFromFirstThread);
  });

  it("should add the new message to the active thread when a message is sent", async () => {
    render(<Messages />);
    await act(() => Promise.resolve());
    const sendButton = screen.getByText("Send");
    fireEvent.click(sendButton);

    const activeThread = screen.getByTestId("activeThread");
    expect(activeThread.textContent).toContain(MOCK_MESSAGE.content);
  });

  it("should show the selected thread's messages when a thread is selected", async () => {
    render(<Messages />);
    await act(() => Promise.resolve());

    const threadListItems = screen.getAllByTestId("threadListItem");
    const selectedThreadListItem = threadListItems[1];
    const messageFromSelectedThread = selectedThreadListItem.textContent;
    fireEvent.click(selectedThreadListItem);

    const activeThread = screen.getByTestId("activeThread");
    expect(activeThread.textContent).toContain(messageFromSelectedThread);
  });

  it("should move the active thread to the top of the list when a message is sent", async () => {
    render(<Messages />);
    await act(() => Promise.resolve());

    const threadListItems = screen.getAllByTestId("threadListItem");
    const selectedThreadListItem = threadListItems[1];
    fireEvent.click(selectedThreadListItem);

    const sendButton = screen.getByText("Send");
    fireEvent.click(sendButton);

    const updatedThreadListItems = screen.getAllByTestId("threadListItem");
    expect(updatedThreadListItems[0].textContent).toContain(MOCK_MESSAGE.content);
  });
});
