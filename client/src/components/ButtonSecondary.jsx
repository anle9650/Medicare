export default function ButtonSecondary(props) {
  return (
    <button
      className={`rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto sm:text-sm ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
