const PATH = import.meta.env.VITE_API_ENDPOINT + "patients";

export async function fetchPatients() {
  const response = await fetch(PATH);
  return response;
}

export async function addPatientRequest(patient) {
  const response = await fetch(PATH, {
    method: "POST",
    body: JSON.stringify(patient),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function updatePatientRequest(patient) {
  const fields = {
    name: patient.name,
    diagnosis: patient.diagnosis,
    status: patient.status,
    photo: patient.photo,
  };

  const response = await fetch(`${PATH}/${patient._id}`, {
    method: "PUT",
    body: JSON.stringify(fields),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

export async function deletePatientRequest(patientId) {
  const response = await fetch(`${PATH}/${patientId}`, {
    method: "DELETE",
  });
  return response;
}
