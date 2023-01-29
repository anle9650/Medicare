import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Task from "../components/Task";

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
    const MOCK_TASK = {
      content: "some task",
      deadline: "January 1, 2023",
      completed: false,
    };

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

  it("should call props.onUpdate with the updated task when checked/unchecked", () => {
    const MOCK_TASK = {
      content: "some task",
      deadline: "January 1, 2023",
      completed: false,
    };

    const updateHandler = vi.fn();

    render(<Task {...MOCK_TASK} onUpdate={updateHandler} />);

    const completedCheckbox = screen.getByTestId("completedCheckbox");
    fireEvent.click(completedCheckbox);

    expect(updateHandler).toHaveBeenCalledWith(
      expect.objectContaining({ ...MOCK_TASK, completed: !MOCK_TASK.completed })
    );
  });

  it("should call props.onDelete when 'Delete' is selected", () => {
    const MOCK_TASK = {
      content: "some task",
      deadline: "January 1, 2023",
      completed: false,
    };

    const updateHandler = vi.fn();
    const deleteHandler = vi.fn();

    render(
      <Task {...MOCK_TASK} onDelete={deleteHandler} onUpdate={updateHandler} />
    );

    const deleteButton = screen.getByText("Delete");
    deleteButton.click();

    expect(deleteHandler).toHaveBeenCalled();
  });
});
