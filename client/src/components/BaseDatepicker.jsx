import { useState, useEffect } from "react";
import Datepicker from "tailwind-datepicker-react";

const options = {
  title: "",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    // () => ReactNode | JSX.Element
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date(),
  language: "en",
};

export default function BaseDatepicker(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    handleChange(options.defaultDate);
  }, []);

  function handleChange(selectedDate) {
    props.onSelect(
      selectedDate.toLocaleDateString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );
  }

  const handleClose = (state) => {
    setShow(state);
  };

  return (
    <Datepicker
      options={options}
      onChange={handleChange}
      show={show}
      setShow={handleClose}
    />
  );
}
