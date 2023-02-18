import MessageThread from "./MessageThread";

export default function Messages() {
  return (
    <section className="h-full grid grid-cols-2 gap-1">
      <div className="bg-white p-3 rounded">Messages</div>
      <MessageThread className="flex flex-col" />
    </section>
  );
}
