import { vi, describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import Task from "../components/Task";

const MOCK_TASK = {
  _id: 1,
  content: "some task",
  deadline: "January 1, 2023",
  completed: false,
};

vi.mock("../services/TaskService", () => ({
  updateTaskRequest: vi.fn((task) => ({
    json: () => new Promise((resolve) => resolve(task)),
    ok: true,
  })),
  deleteTaskRequest: vi.fn((_id) => ({
    json: () => new Promise((resolve) => resolve({_id})),
    ok: true,
  })),
}));

vi.mock("../components/TaskDropdown", () => ({
  default: (props) => (
    <menu data-testid="taskDropdown">
      <li>
        <button onClick={props.onDelete}>Delete</button>
      </li>
    </menu>
  ),
}));

describe("Task", () => {
  it("should be unchecked if the task is not completed", () => {
    const updateHandler = vi.fn();
    render(<Task {...MOCK_TASK} onUpdate={updateHandler} />);
    const completedCheckbox = screen.getByTestId("completedCheckbox");
    expect(completedCheckbox.checked).toBeFalsy();
  });

  it("should be checked if the task is completed", () => {
    const MOCK_TASK = {
      content: "some task",
      deadline: "January 1, 2023",
      completed: true,
    };

    render(<Task {...MOCK_TASK} />);
    const completedCheckbox = screen.getByTestId("completedCheckbox");
    expect(completedCheckbox.checked).toBeTruthy();
  });

  it("should call props.onUpdate with the updated task when checked/unchecked", async () => {
    const updateHandler = vi.fn();
    render(<Task {...MOCK_TASK} onUpdate={updateHandler} />);

    const completedCheckbox = screen.getByTestId("completedCheckbox");
    await act(() => completedCheckbox.click());

    expect(updateHandler).toHaveBeenCalledWith(
      expect.objectContaining({ ...MOCK_TASK, completed: !MOCK_TASK.completed })
    );
  });

  it("should call props.onDelete when 'Delete' is selected", async () => {
    const updateHandler = vi.fn();
    const deleteHandler = vi.fn();

    render(
      <Task {...MOCK_TASK} onDelete={deleteHandler} onUpdate={updateHandler} />
    );

    const deleteButton = screen.getByText("Delete");
    await act(() => deleteButton.click());

    expect(deleteHandler).toHaveBeenCalled();
  });
});
