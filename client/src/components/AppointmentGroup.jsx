import Appointment from "./Appointment";

export default function AppointmentGroup(props) {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="border-r-2">
        <span>{props.startTime}</span>
      </div>
      <div className="col-span-5 p-1">
          {props.appointments.map((appointment) => (
            <Appointment key={appointment.id} {...appointment} />
          ))}
      </div>
    </div>
  );
}
