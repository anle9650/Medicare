import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Appointment from "../components/Appointment";

const MOCK_APPOINTMENT = {
  id: 1,
  name: "Rice Kotlin",
  patient: {
    name: "Rice Kotlin",
  },
  scheduledStart: "8:00 AM",
  scheduledEnd: "8:20 AM",
  purpose: "Cough",
  start: null,
  end: null,
};

describe("Appointment", () => {
  it("should call props.onSelect when the appointment is clicked", () => {
    const selectHandler = vi.fn();
    render(<Appointment onSelect={selectHandler} />);

    const appointment = screen.getByTestId("appointmentContainer");
    fireEvent.click(appointment);

    expect(selectHandler).toHaveBeenCalled();
  });

  it("should show the appointment details if the appointment is selected", () => {
    MOCK_APPOINTMENT.isSelected = true;
    render(<Appointment {...MOCK_APPOINTMENT} />);
    expect(screen.getByTestId("appointmentDetails"));
  });

  it("should not show the appointment details if the appointment is not selected", () => {
    MOCK_APPOINTMENT.isSelected = false;
    render(<Appointment {...MOCK_APPOINTMENT} />);
    const appointmentDetail = screen.queryByTestId("appointmentDetails");
    expect(appointmentDetail).toBeNull();
  });

  it("should show a blue indicator if the appointment has not started yet", () => {
    MOCK_APPOINTMENT.isSelected = true;
    MOCK_APPOINTMENT.start = null;
    MOCK_APPOINTMENT.end = null;

    render(<Appointment {...MOCK_APPOINTMENT} />);
    const statusIndicator = screen.getByTestId("statusIndicator");
    expect(statusIndicator.className).toContain('blue');
  });

  it("should show 'Begin Appointment' if the appointment has not started yet", () => {
    MOCK_APPOINTMENT.isSelected = true;
    MOCK_APPOINTMENT.start = null;
    MOCK_APPOINTMENT.end = null;

    render(<Appointment {...MOCK_APPOINTMENT} />);
    expect(screen.getByText("Begin Appointment"));
  });

  it("should call props.onStart if 'Begin Appointment' is clicked", () => {
    MOCK_APPOINTMENT.isSelected = true;
    MOCK_APPOINTMENT.start = null;
    MOCK_APPOINTMENT.end = null;

    const startHandler = vi.fn();
    render(<Appointment {...MOCK_APPOINTMENT} onStart={startHandler} />);
    const beginAppointment = screen.getByText("Begin Appointment");
    fireEvent.click(beginAppointment);

    expect(startHandler).toHaveBeenCalled();
  });

  it("should show a green indicator if the appointment has started, but has not ended yet", () => {
    MOCK_APPOINTMENT.isSelected = true;
    MOCK_APPOINTMENT.start = "8:00 AM";
    MOCK_APPOINTMENT.end = null;

    render(<Appointment {...MOCK_APPOINTMENT} />);
    const statusIndicator = screen.getByTestId("statusIndicator");
    expect(statusIndicator.className).toContain('green');
  });

  it("should show 'End Appointment' if the appointment has started, but has not ended yet", () => {
    MOCK_APPOINTMENT.isSelected = true;
    MOCK_APPOINTMENT.start = "8:00 AM";
    MOCK_APPOINTMENT.end = null;

    render(<Appointment {...MOCK_APPOINTMENT} />);
    expect(screen.getByText("End Appointment"));
  });

  it("should call props.onEnd if 'End Appointment' is clicked", () => {
    MOCK_APPOINTMENT.isSelected = true;
    MOCK_APPOINTMENT.start = "8:00 AM";
    MOCK_APPOINTMENT.end = null;

    const endHandler = vi.fn();
    render(<Appointment {...MOCK_APPOINTMENT} onEnd={endHandler} />);
    const endAppointment = screen.getByText("End Appointment");
    fireEvent.click(endAppointment);
    
    expect(endHandler).toHaveBeenCalled();
  });

  it("should show a grey indicator if the appointment has started and ended", () => {
    MOCK_APPOINTMENT.isSelected = true;
    MOCK_APPOINTMENT.start = "8:00 AM";
    MOCK_APPOINTMENT.end = "9:00 AM";

    render(<Appointment {...MOCK_APPOINTMENT} />);
    const statusIndicator = screen.getByTestId("statusIndicator");
    expect(statusIndicator.className).toContain('slate');
  });

  it("should show neither 'Begin Appointment' nor 'End Appointment' if the appointment has already started and ended", () => {
    MOCK_APPOINTMENT.isSelected = true;
    MOCK_APPOINTMENT.start = "8:00 AM";
    MOCK_APPOINTMENT.end = "9:00 AM";

    render(<Appointment {...MOCK_APPOINTMENT} />);

    const beginAppointment = screen.queryByText("Begin Appointment");
    expect(beginAppointment).toBeNull();

    const endAppointment = screen.queryByText("End Appointment");
    expect(endAppointment).toBeNull();
  });
});
