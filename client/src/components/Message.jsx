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
        } p-3 rounded-lg max-w-[75%]`}
      >
        {props.content}
      </div>
    </div>
  );
}
