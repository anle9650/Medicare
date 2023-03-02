import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AppointmentGroup from "../components/AppointmentGroup";

const MOCK_TIME = "8:00 AM";
const MOCK_APPOINTMENTS = [
  {
    _id: 1,
    name: "Rice Kotlin",
    patient: {
      name: "Rice Kotlin",
    },
    scheduledStart: "8:00 AM",
    scheduledEnd: "8:20 AM",
    purpose: "Cough",
    start: "8:00 AM",
    end: "8:20 AM",
  },
  {
    _id: 2,
    name: "Maya Adamu",
    patient: {
      name: "Rice Kotlin",
    },
    scheduledStart: "8:20 AM",
    scheduledEnd: "8:30 AM",
    purpose: "Fever",
    start: "8:20 AM",
    end: "8:30 AM",
  },
];

vi.mock("../components/Appointment", () => ({
    default: (props) => (
        <>
          <div onClick={props.onSelect}>{props.name}</div>
          <button onClick={props.onStart}>Start Appointment</button>
          <button onClick={props.onEnd}>End Appointment</button>
          <button onClick={props.onDelete}>Delete Appointment</button> 
        </>
    )
}))

describe("AppointmentGroup", () => {
  it("should call props.onSelectAppointment with the appointment when an appointment is selected", () => {
    const SELECTED_APPOINTMENT = MOCK_APPOINTMENTS[0];

    const selectAppointmentHandler = vi.fn();
    render(<AppointmentGroup startTime={MOCK_TIME} appointments={MOCK_APPOINTMENTS} onSelectAppointment={selectAppointmentHandler} />);
    fireEvent.click(screen.getByText(SELECTED_APPOINTMENT.name));

    expect(selectAppointmentHandler).toHaveBeenCalledWith(SELECTED_APPOINTMENT);
  });

  it("should call props.onStartAppointment with the appointment when an appointment is started", () => {
    const SELECTED_APPOINTMENT = MOCK_APPOINTMENTS[0];

    const startAppointmentHandler = vi.fn();
    render(<AppointmentGroup startTime={MOCK_TIME} appointments={MOCK_APPOINTMENTS} onStartAppointment={startAppointmentHandler} />);
    fireEvent.click(screen.getAllByText("Start Appointment")[0]);

    expect(startAppointmentHandler).toHaveBeenCalledWith(SELECTED_APPOINTMENT);
  });

  it("should call props.onEndAppointment with the appointment when an appointment is ended", () => {
    const SELECTED_APPOINTMENT = MOCK_APPOINTMENTS[0];

    const endAppointmentHandler = vi.fn();
    render(<AppointmentGroup startTime={MOCK_TIME} appointments={MOCK_APPOINTMENTS} onEndAppointment={endAppointmentHandler} />);
    fireEvent.click(screen.getAllByText("End Appointment")[0]);

    expect(endAppointmentHandler).toHaveBeenCalledWith(SELECTED_APPOINTMENT);
  });

  it("should call props.onDeleteAppointment with the appointment when an appointment is deleted", () => {
    const SELECTED_APPOINTMENT = MOCK_APPOINTMENTS[0];

    const deleteAppointmentHandler = vi.fn();
    render(<AppointmentGroup startTime={MOCK_TIME} appointments={MOCK_APPOINTMENTS} onDeleteAppointment={deleteAppointmentHandler} />);
    fireEvent.click(screen.getAllByText("Delete Appointment")[0]);

    expect(deleteAppointmentHandler).toHaveBeenCalledWith(SELECTED_APPOINTMENT);
  });
});
