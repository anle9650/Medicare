import { useState } from "react";
import AppointmentGroup from "./AppointmentGroup";
import AppointmentEditModal from "./AppointmentEditModal";
import BaseModal from "./BaseModal";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import appointmentData from "../data/appointments.json";

function getHour(time) {
  return parseInt(time.split(":")[0]);
}

export default function Schedule() {
  const [appointments, setAppointments] = useState(getAppointments());
  const [editingAppointment, setEditingAppointment] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

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

  function addAppointment(newAppointment) {
    console.log(newAppointment);
  }

  function selectAppointment(selected) {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) => ({
        ...appointment,
        isSelected:
          appointment.id === selected.id ? !appointment.isSelected : false,
      }))
    );
  }

  function startAppointment(toStart) {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) => {
        if (appointment.id === toStart.id) {
          const today = new Date();
          const time =
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();

          return {
            ...appointment,
            start: time,
          };
        }
        return appointment;
      })
    );
  }

  function endAppointment(toEnd) {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) => {
        if (appointment.id === toEnd.id) {
          const today = new Date();
          const time =
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();

          return {
            ...appointment,
            end: time,
          };
        }
        return appointment;
      })
    );
  }

  function confirmDeleteAppointment(toDelete) {
    setAppointmentToDelete(toDelete);
  }

  function deleteAppointment() {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment !== appointmentToDelete)
    );
    setAppointmentToDelete(null);
  }

  return (
    <>
      <div className="bg-white rounded p-4">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-bold">Upcoming Schedule</h3>
          <button
            className="text-indigo-600 border border-gray-300 rounded px-2 py-1 ml-auto hover:bg-gray-50"
            onClick={() => setEditingAppointment(true)}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        {hourStartTimes.map((hourStartTime) => (
          <AppointmentGroup
            key={hourStartTime}
            startTime={hourStartTime}
            appointments={groupedAppointments[hourStartTime]}
            onSelectAppointment={(appointment) =>
              selectAppointment(appointment)
            }
            onStartAppointment={(appointment) => startAppointment(appointment)}
            onEndAppointment={(appointment) => endAppointment(appointment)}
            onDeleteAppointment={(appointment) =>
              confirmDeleteAppointment(appointment)
            }
          />
        ))}
      </div>

      <AppointmentEditModal
        open={editingAppointment}
        onSubmit={(appointment) => addAppointment(appointment)}
        onClose={() => setEditingAppointment(false)}
      />
      
      <BaseModal
        open={!!appointmentToDelete}
        onClose={() => setAppointmentToDelete(null)}
      >
        <BaseModal.Body>
          Are you sure you want to delete this appointment?
        </BaseModal.Body>
        <BaseModal.Footer>
          <ButtonPrimary onClick={deleteAppointment}>Yes, I'm sure</ButtonPrimary>
          <ButtonSecondary
            className="mr-2"
            onClick={() => setAppointmentToDelete(null)}
          >
            Cancel
          </ButtonSecondary>
        </BaseModal.Footer>
      </BaseModal>
    </>
  );
}
