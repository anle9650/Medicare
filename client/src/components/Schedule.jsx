import { useState } from "react";
import AppointmentGroup from "./AppointmentGroup";
import Appointment from "./Appointment";
import appointmentData from "../data/appointments.json";

function getHour(time) {
  return parseInt(time.split(":")[0]);
}

export default function Schedule() {
  const NUMBER_OF_WORK_HOURS_IN_DAY = 10;
  const START_TIME = 8;

  const HOUR_START_TIMES = [...Array(NUMBER_OF_WORK_HOURS_IN_DAY).keys()].map(
    (i) => i + START_TIME
  );

  const [appointments, setAppointments] = useState(getAppointments());
  const [addingAppointment, setAddingAppointment] = useState(false);

  const groupedAppointments = groupAppointmentsByHour();

  function getAppointments() {
    return appointmentData;
  }

  function groupAppointmentsByHour() {
    const groupedAppointments = {};

    HOUR_START_TIMES.forEach((hourStartTime) => {
      groupedAppointments[hourStartTime] = appointments.filter(
        (appointment) => getHour(appointment.scheduledStart) === hourStartTime
      );
    });

    return groupedAppointments;
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
      {HOUR_START_TIMES.map((hourStartTime) => (
        <AppointmentGroup
          key={hourStartTime}
          startTime={hourStartTime}
          appointments={groupedAppointments[hourStartTime]}
        />
      ))}
    </div>
  );
}
