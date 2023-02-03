import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Appointment from "../components/Appointment";

describe("Appointment", () => {
  it("should call props.onSelect when the appointment is clicked", () => {
    const selectHandler = vi.fn();
    render(<Appointment onSelect={selectHandler} />);

    const appointment = screen.getByTestId("appointmentContainer");
    fireEvent.click(appointment);

    expect(selectHandler).toHaveBeenCalled();
  });
});
