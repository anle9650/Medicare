const PATH = "http://localhost:8000/api/messages";

export async function fetchThreads() {
  const response = await fetch(PATH + '/threads');
  return response;
}

export async function addMessageRequest(message) {
  const response = await fetch(PATH, {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function deleteMessageRequest(messageId) {
  const response = await fetch(`${PATH}/${messageId}`, {
    method: "DELETE",
  });
  return response;
}
