import Appointment from "./Appointment";

export default function AppointmentGroup(props) {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="flex items-start border-r-2 p-0">
        <span>{props.startTime}</span>
        <div className="bg-black rounded-full p-2 ml-auto mt-1 translate-x-2"></div>
      </div>
      <div className="col-span-5 px-1 py-2">
          {props.appointments.map((appointment) => (
            <Appointment key={appointment.id} {...appointment} />
          ))}
      </div>
    </div>
  );
}
