export default function ButtonPrimary(props) {
  return (
    <button
      className={`rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto sm:text-sm ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
