export default function Appointment(props) {
  const hasEnded = !!props.end;
  const inProgress = props.start && !props.end;
  const notStarted = !props.start;

  const appointmentInfo = (
    <div className="border p-3 rounded-lg mt-3">
      <div className="grid grid-cols-3">
        <div className="col-span-1 font-medium leading-loose">
          {props.patient && <p>Patient</p>}
          <p>Time</p>
          <p>Purpose</p>
        </div>
        <div className="col-span-2 leading-loose">
          {props.patient && <p>{props.patient.name}</p>}
          <p>
            {props.scheduledStart} - {props.scheduledEnd}
          </p>
          <p>{props.purpose}</p>
        </div>
      </div>
      <hr className="my-2" />
      <div className="flex">
        <button className="mr-auto">Delete</button>
        {!hasEnded && (
          <button
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={notStarted ? props.onStart : props.onEnd}
          >
            {notStarted ? "Begin" : "End"} Appointment
          </button>
        )}
      </div>
    </div>
  );

  function getStatusColor() {
    if (hasEnded) {
      return "slate-300";
    }
    if (inProgress) {
      return "green-600";
    }
    if (notStarted) {
      return "blue-500";
    }
  }

  return (
    <>
      <div
        className={`grid grid-cols-12 p-2 cursor-pointer hover:border rounded-lg ${
          props.isSelected ? "border" : ""
        } ${props.className}`}
        onClick={props.onSelect}
        data-testid="appointmentContainer"
      >
        <div className="col-span-4 flex items-center">
          <div
            className={`bg-${getStatusColor()} rounded-full p-1.5 mr-2`}
          ></div>
          <strong>{props.scheduledStart}</strong>
        </div>
        <span className="col-span-7">{props.name}</span>
        <button className="col-span-1 border rounded-lg">
          <i
            className={`fa-solid fa-chevron-down ${
              props.isSelected ? "rotate-180" : ""
            } transition-transform`}
          />
        </button>
      </div>
      {props.isSelected && appointmentInfo}
    </>
  );
}
