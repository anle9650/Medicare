import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Patients from "../components/Patients";

describe("patients", () => {
  it("should update the table to match the search term when typed into the search bar", () => {
    const SEARCH_TERM = "Amalia";

    render(<Patients />);
    const searchBar = screen.getByLabelText("Search");
    fireEvent.change(searchBar, { target: { value: SEARCH_TERM } });
    const tableRows = screen.getAllByTestId("tableRow");

    expect(tableRows.length).toBe(1);
    expect(tableRows[0].textContent).toContain(SEARCH_TERM);
  });
});
