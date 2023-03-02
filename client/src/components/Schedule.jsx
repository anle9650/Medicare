import { useState, useEffect } from "react";
import {
  fetchAppointments,
  updateAppointmentRequest,
  deleteAppointmentRequest,
} from "../services/AppointmentService";
import AppointmentGroup from "./AppointmentGroup";
import AppointmentEditModal from "./AppointmentEditModal";
import BaseModal from "./BaseModal";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";

function getHour(time) {
  return parseInt(time.split(":")[0]);
}

function getCurrentTime() {
  const today = new Date();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
}

export default function Schedule() {
  const [appointments, setAppointments] = useState();
  const [editingAppointment, setEditingAppointment] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  const hourStartTimes =
    [
      ...new Set(
        appointments?.map((appointment) => getHour(appointment.scheduledStart))
      ),
    ] ?? [];

  const groupedAppointments = groupAppointmentsByHour();

  useEffect(() => {
    async function getAppointments() {
      const response = await fetchAppointments();

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const appointments = await response.json();
      setAppointments(appointments);
    }

    getAppointments();
  }, []);

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
          appointment._id === selected._id ? !appointment.isSelected : false,
      }))
    );
  }

  async function startAppointment(toStart) {
    const currentTime = getCurrentTime();
    const updatedAppointment = { ...toStart, start: currentTime };
    const success = await updateAppointment(updatedAppointment);

    if (!success) {
      return;
    }

    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === toStart._id ? updatedAppointment : appointment
      )
    );
  }

  async function endAppointment(toEnd) {
    const currentTime = getCurrentTime();
    const updatedAppointment = { ...toEnd, end: currentTime };
    const success = await updateAppointment(updatedAppointment);

    if (!success) {
      return;
    }

    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === toEnd._id ? updatedAppointment : appointment
      )
    );
  }

  async function updateAppointment(appointment) {
    const response = await updateAppointmentRequest(appointment);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const updatedAppointment = await response.json();
    return updatedAppointment;
  }

  function confirmDeleteAppointment(toDelete) {
    setAppointmentToDelete(toDelete);
  }

  async function deleteAppointment() {
    const response = await deleteAppointmentRequest(appointmentToDelete._id);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    setAppointments((prevAppointments) =>
      prevAppointments.filter(
        (appointment) => appointment !== appointmentToDelete
      )
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
          <ButtonPrimary onClick={deleteAppointment}>
            Yes, I'm sure
          </ButtonPrimary>
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
