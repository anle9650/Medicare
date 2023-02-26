const PATH = "http://localhost:8000/api/tasks";

export async function fetchTasks() {
  const response = await fetch(PATH);
  return response;
}

export async function addTaskRequest(task) {
  const response = await fetch(PATH, {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function updateTaskRequest(task) {
  const fields = {
    content: task.content,
    completed: task.completed,
    deadline: task.deadline
  };

  const response = await fetch(`${PATH}/${task._id}`, {
    method: "PUT",
    body: JSON.stringify(fields),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}
