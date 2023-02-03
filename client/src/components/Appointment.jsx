export default function Appointment(props) {
  const hasEnded = !!props.end;
  const inProgress = props.start && !props.end;
  const notStarted = !props.start;

  const appointmentInfo = (
    <div className="grid grid-cols-3 border p-3 rounded-lg mt-3">
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
        <p className="col-span-6">{props.name}</p>
      </div>
      {props.isSelected && appointmentInfo}
    </>
  );
}
