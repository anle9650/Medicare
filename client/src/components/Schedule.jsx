import { useState } from "react";
import AppointmentGroup from "./AppointmentGroup";
import appointmentData from "../data/appointments.json";

function getHour(time) {
  return parseInt(time.split(":")[0]);
}

export default function Schedule() {
  const [appointments, setAppointments] = useState(getAppointments());
  const [addingAppointment, setAddingAppointment] = useState(false);

  const hourStartTimes = [
    ...new Set(
      appointments.map((appointment) => getHour(appointment.scheduledStart))
    ),
  ];

  const groupedAppointments = groupAppointmentsByHour();

  function getAppointments() {
    return appointmentData;
  }

  function groupAppointmentsByHour() {
    const groupedAppointments = {};

    hourStartTimes.forEach((hourStartTime) => {
      groupedAppointments[hourStartTime] = appointments.filter(
        (appointment) => getHour(appointment.scheduledStart) === hourStartTime
      );
    });

    return groupedAppointments;
  }

  function selectAppointment(selected) {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) => ({
        ...appointment,
        isSelected:
          appointment.id === selected.id
            ? !appointment.isSelected
            : false,
      }))
    );
  }

  return (
    <div className="bg-white rounded p-4">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-bold">Upcoming Schedule</h3>
        <button
          className="text-indigo-600 border border-gray-300 rounded px-2 py-1 ml-auto hover:bg-gray-50"
          onClick={() => setAddingAppointment(true)}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      {hourStartTimes.map((hourStartTime) => (
        <AppointmentGroup
          key={hourStartTime}
          startTime={hourStartTime}
          appointments={groupedAppointments[hourStartTime]}
          onSelectAppointment={(appointment) => selectAppointment(appointment)}
        />
      ))}
    </div>
  );
}
