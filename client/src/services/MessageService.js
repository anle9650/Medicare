const PATH = import.meta.env.VITE_API_ENDPOINT + "messages";

export async function fetchThreads() {
  const response = await fetch(PATH + '/threads');
  return response;
}

export async function sendMessageRequest(message) {
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
