import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Tasks from "../components/Tasks";

const MOCK_TASK = {
  content: "some task",
  deadline: "January 1, 2023",
  complete: false,
};

vi.mock("../components/TaskEditModal", () => ({
  default: (props) => (
    <div data-testid="taskEditModal" onClick={() => props.onAdd(MOCK_TASK)}>
      Add Task Modal
    </div>
  ),
}));

vi.mock("../components/Task", () => ({
  default: (props) => (
    <div data-testid="task">
      {props.content}
      <button onClick={props.onDelete}>Delete</button>
    </div>
  ),
}));

describe("Tasks", () => {
  it("should display the newly added task when a task is added", async () => {
    render(<Tasks />);
    const taskEditModal = screen.getByTestId("taskEditModal");
    fireEvent.click(taskEditModal);
    expect(await screen.findByText(MOCK_TASK.content));
  });

  it("should remove the task if a task is deleted", () => {
    render(<Tasks />);

    const taskToDelete = screen.getAllByTestId("task")[0];
    const deleteTaskButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteTaskButton);

    expect(screen.queryByText(taskToDelete.textContent)).toBeNull();
  });
});
