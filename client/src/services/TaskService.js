const PATH = 'http://localhost:8000/api/tasks';

export async function fetchTasks() {
  const response = await fetch(PATH);
  return response;
}

export async function addTaskRequest(task) {
    const response = await fetch(PATH, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response;
}