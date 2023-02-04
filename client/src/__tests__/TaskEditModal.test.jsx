import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskEditModal from "../components/TaskEditModal";

beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe("TaskEditModal", () => {
  it("should call props.onSubmit with the new task when the form is submitted with all required fields", async () => {
    const MOCK_CONTENT = "some task";

    const submitHandler = vi.fn();
    const closeHandler = vi.fn();

    render(
      <TaskEditModal
        open={true}
        onSubmit={submitHandler}
        onClose={closeHandler}
      ></TaskEditModal>
    );

    const form = screen.getByTestId("form");
    const descriptionTextarea = screen.getByLabelText("Description");

    fireEvent.change(descriptionTextarea, {
      target: { name: "content", value: MOCK_CONTENT },
    });

    await screen.findByText(MOCK_CONTENT);
    fireEvent.submit(form);

    expect(submitHandler).toHaveBeenCalledWith(
      expect.objectContaining({ content: MOCK_CONTENT })
    );
  });

  it("should not call props.onSubmit when the form is submitted without all required fields", async () => {
    const submitHandler = vi.fn();
    const closeHandler = vi.fn();

    render(
      <TaskEditModal
        open={true}
        onSubmit={submitHandler}
        onClose={closeHandler}
      ></TaskEditModal>
    );

    const form = screen.getByTestId("form");
    fireEvent.submit(form);
    expect(submitHandler).not.toHaveBeenCalled();
  });
});
