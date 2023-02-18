export default function Message(props) {
  return (
    <div
      className={`flex ${props.type === "outgoing" ? "justify-end" : ""} ${
        props.className
      }`}
    >
      <div
        className={`${
          props.type === "outgoing" ? "bg-sky-200" : "bg-slate-200"
        } p-3 rounded-lg`}
      >
        {props.content}
      </div>
    </div>
  );
}
