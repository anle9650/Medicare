import avatarPerson from "../assets/avatar-person.svg";

export default function PatientPhoto(props) {
  function getImageUrl() {
    if (!props.photo) {
      return avatarPerson;
    }
    return new URL(`../assets/${props.photo}`, import.meta.url).href;
  }

  return (
    <img
      className="w-8 h-8 rounded-full object-cover"
      src={getImageUrl()}
      alt={props.name}
    />
  );
}
