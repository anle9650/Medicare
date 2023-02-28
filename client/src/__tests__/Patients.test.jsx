import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Patients from "../components/Patients";
import patientData from "../data/patients.json";

vi.mock("../services/PatientService", () => ({
  fetchPatients: vi.fn(() => ({
    json: () => new Promise((resolve) => resolve(patientData)),
    ok: true,
  })),
}));

describe("patients", () => {
  it("should update the table to match the search term when typed into the search bar", async () => {
    const SEARCH_TERM = "Amalia";

    render(<Patients />);
    await act(() => new Promise(process.nextTick));
    const searchBar = screen.getByLabelText("Search");
    fireEvent.change(searchBar, { target: { value: SEARCH_TERM } });
    const tableRows = screen.getAllByTestId("tableRow");

    expect(tableRows.length).toBe(1);
    expect(tableRows[0].textContent).toContain(SEARCH_TERM);
  });
});
