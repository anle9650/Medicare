export default function Task(props) {

  function updateTask(event) {
    const { name, type, value, checked } = event.target;

    const updatedTask = { 
        ...props,
        [name]: type === 'checkbox' ? checked : value 
    };

    props.onUpdate(updatedTask);
  }

  return (
    <div className={`bg-gray-100 rounded p-4 ${props.className}`}>
      <label className="grid grid-cols-12 items-center gap-x-3">
        <input
          type="checkbox"
          name="completed"
          checked={props.completed}
          onChange={updateTask}
          className="border-gray-300 rounded p-3"
        />
        <div className="col-span-7">
          <span className="font-bold">
            {props.completed ? "Successfully Completed" : "Not completed"}
          </span>
          <p>{props.content}</p>
        </div>
        <span className="italic col-span-3">{props.deadline}</span>
        <button className="border border-gray-300 rounded px-1.5">...</button>
      </label>
    </div>
  );
}
