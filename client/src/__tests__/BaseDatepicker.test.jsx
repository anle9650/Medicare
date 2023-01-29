import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BaseDatepicker from "../components/BaseDatepicker";

vi.mock("tailwind-datepicker-react", () => ({
  default: () => <div data-testid="datepicker">Datepicker</div>,
}));

describe("BaseDatepicker", () => {
  it("should call props.onSelect with the formatted date when a date is selected", () => {
    const MOCK_DATE = new Date();

    const FORMATTED_DATE = MOCK_DATE.toLocaleDateString("en-us", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const selectHandler = vi.fn();
    render(<BaseDatepicker onSelect={selectHandler}></BaseDatepicker>);
    const datepicker = screen.getByTestId("datepicker");

    fireEvent.change(datepicker, MOCK_DATE);

    expect(selectHandler).toHaveBeenCalledWith(FORMATTED_DATE);
  });
});
