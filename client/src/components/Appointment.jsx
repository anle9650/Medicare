export default function Appointment(props) {
    const hasEnded = !!props.end;
    const inProgress = props.start && !props.end;
    const notStarted = !props.start;

    function getStatusColor() {
        if (hasEnded) {
            return 'slate-300';
        }
        if (inProgress) {
            return 'green-600';
        }
        if (notStarted) {
            return 'blue-500';
        }
    }

    return (
        <div className="grid grid-cols-12 p-2">
            <div className="col-span-4 flex items-center">
                <div className={`bg-${getStatusColor()} rounded-full p-1.5 mr-2`}></div>
                <strong>{props.scheduledStart}</strong>
            </div>
            <p className="col-span-6">{props.name}</p>
        </div>
    )
}