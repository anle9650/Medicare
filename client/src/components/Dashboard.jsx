import Tasks from "./Tasks"

export default function Dashboard() {
    return (
        <section className="bg-gray-100 w-full p-5">
            <div>
                <span>Dashboard {'>'} </span><span>Summary</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-white rounded p-4">
                    <h3>Offline Consultations</h3>
                </div>
                <div className="bg-white rounded p-4">
                    <h3>Online Consultations</h3>
                </div>
                <div className="bg-white rounded p-4">
                    <h3>Total Patients</h3>
                </div>
                <div className="col-span-2">
                    <Tasks />
                </div>
            </div>
        </section>
    )
}