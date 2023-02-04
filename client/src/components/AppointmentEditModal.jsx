import { useState } from "react";
import BaseModal from "./BaseModal";
import BaseDatepicker from "./BaseDatepicker";

export default function AppointmentEditModal(props) {
  const [appointment, setAppointment] = useState({
    name: "",
    patient: null,
    scheduledStart: null,
    scheduledEnd: null,
    purpose: "",
  });

  function updateAppointment(event) {
    const { name, value } = event.target;
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value,
    }));
  }

  function setDate(date) {
    setAppointment((prevAppointment) => ({ ...prevAppointment, date }));
  }

  function handleSubmit() {
    event.preventDefault();

    props.onSubmit({ ...appointment });
    props.onClose();

    setAppointment({
      name: "",
      patient: null,
      scheduledStart: null,
      scheduledEnd: null,
      purpose: "",
    });
  }

  return (
    <BaseModal open={props.open} onClose={props.onClose}>
      <BaseModal.Header>Add Appointment</BaseModal.Header>
      <BaseModal.Body>
        <div className="flex flex-col justify-between h-[32rem] mt-2">
          <form id="appointmentForm" onSubmit={handleSubmit} data-testid="form">
            <label
              htmlFor="purpose"
              className="block text-sm font-medium text-gray-700"
            >
              Purpose
            </label>
            <textarea
              id="purpose"
              name="purpose"
              value={appointment.purpose}
              onChange={updateAppointment}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mt-3"
            >
              Date
            </label>
            <BaseDatepicker
              name="date"
              value={appointment.date}
              onSelect={(date) => setDate(date)}
              data-testid="datepicker"
            />
          </form>
        </div>
      </BaseModal.Body>
      <BaseModal.Footer>
        <button
          type="submit"
          form="appointmentForm"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Save
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={props.onClose}
        >
          Cancel
        </button>
      </BaseModal.Footer>
    </BaseModal>
  );
}
