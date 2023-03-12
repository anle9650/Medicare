const PATH = import.meta.env.VITE_API_ENDPOINT + "appointments";

export async function fetchAppointments() {
  const response = await fetch(PATH);
  return response;
}

export async function addAppointmentRequest(appointment) {
  const response = await fetch(PATH, {
    method: "POST",
    body: JSON.stringify(appointment),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function updateAppointmentRequest(appointment) {
  const fields = {
    name: appointment.name,
    patient: appointment.patient._id,
    purpose: appointment.purpose,
    scheduledStart: appointment.scheduledStart,
    scheduledEnd: appointment.scheduledEnd,
    start: appointment.start,
    end: appointment.end,
  };

  const response = await fetch(`${PATH}/${appointment._id}`, {
    method: "PUT",
    body: JSON.stringify(fields),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

export async function deleteAppointmentRequest(appointmentId) {
  const response = await fetch(`${PATH}/${appointmentId}`, {
    method: "DELETE",
  });
  return response;
}
