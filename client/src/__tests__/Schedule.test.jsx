import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Schedule from "../components/Schedule";

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

describe("Schedule", () => {
  it("should ask the user for confirmation before deleting an appointment", () => {
    mockAppointmentGroup();
    render(<Schedule />);

    const appointmentToDelete = screen.getAllByTestId("appointment")[0];
    const deleteButton = screen.getAllByText("Delete Appointment")[0];
    fireEvent.click(deleteButton);

    expect(screen.queryByText(appointmentToDelete.textContent)).not.toBeNull();
  });

  it("should delete the appointment after the user confirms", () => {
    mockAppointmentGroup();
    render(<Schedule />);

    const appointmentToDelete = screen.getAllByTestId("appointment")[0];
    const deleteButton = screen.getAllByText("Delete Appointment")[0];
    fireEvent.click(deleteButton);
    fireEvent.click(screen.getByText("Yes, I'm sure"));

    expect(screen.queryByText(appointmentToDelete.textContent)).toBeNull();
  });
});

function mockAppointmentGroup() {
  vi.mock("../components/AppointmentGroup", () => ({
    default: (props) => (
      <ul>
        {props.appointments.map((appointment) => (
          <li key={appointment.id}>
            <span data-testid="appointment">{appointment.name}</span>
            <button onClick={() => props.onDeleteAppointment(appointment)}>
              Delete Appointment
            </button>
          </li>
        ))}
      </ul>
    ),
  }));
}
