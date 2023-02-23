import Tasks from "./Tasks";
import Schedule from "./Schedule";

export default function Dashboard() {
  return (
    <section>
      <div>
        <span>Dashboard {">"} </span>
        <span>Summary</span>
      </div>
      {/* <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-white rounded p-4">
          <h3>Offline Consultations</h3>
        </div>
        <div className="bg-white rounded p-4">
          <h3>Online Consultations</h3>
        </div>
        <div className="bg-white rounded p-4">
          <h3>Total Patients</h3>
        </div>
      </div> */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Tasks />
        <Schedule />
      </div>
    </section>
  );
}
