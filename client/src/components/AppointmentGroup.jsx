import Appointment from "./Appointment";

export default function AppointmentGroup(props) {

  function formatHour(hour) {
    return `${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`;
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3 flex items-start border-r-2">
        <span>{formatHour(props.startTime)}</span>
        <div className="bg-black rounded-full p-2 ml-auto mt-1 translate-x-2"></div>
      </div>
      <div className="col-span-9 pl-3 py-3">
          {props.appointments.map((appointment) => (
            <Appointment key={appointment.id} {...appointment} />
          ))}
      </div>
    </div>
  );
}
