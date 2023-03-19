import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import PatientLookup from "../components/PatientLookup";
import patientData from "../data/patients.json";

vi.mock("../services/PatientService", () => ({
  fetchPatients: vi.fn(() => ({
    json: () => new Promise((resolve) => resolve(patientData)),
    ok: true,
  })),
}));

describe("PatientLookup", () => {
  it("should show the dropdown menu on focus", async () => {
    render(<PatientLookup />);
    await act(() => new Promise(process.nextTick));
    const input = screen.getByTestId("input");
    fireEvent.focus(input);
    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown.className).not.toContain("hidden");
  });

  it("should hide the dropdown menu on blur", async () => {
    render(<PatientLookup />);
    await act(() => new Promise(process.nextTick));
    const input = screen.getByTestId("input");
    fireEvent.focus(input);
    fireEvent.blur(input);
    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown.className).toContain("hidden");
  });

  it("should keep the dropdown menu open when blur event occurs while mousing over the menu", async () => {
    render(<PatientLookup />);
    await act(() => new Promise(process.nextTick));

    const input = screen.getByTestId("input");
    const dropdown = screen.getByTestId("dropdown");

    fireEvent.focus(input);
    fireEvent.mouseOver(dropdown);
    fireEvent.blur(input);

    expect(dropdown.className).not.toContain("hidden");
  });

  it("should close the dropdown menu open when blur event occurs after the mouse leaves the menu", async () => {
    render(<PatientLookup />);
    await act(() => new Promise(process.nextTick));

    const input = screen.getByTestId("input");
    const dropdown = screen.getByTestId("dropdown");

    fireEvent.focus(input);
    fireEvent.mouseOver(dropdown);
    fireEvent.mouseLeave(dropdown);
    fireEvent.blur(input);

    expect(dropdown.className).toContain("hidden");
  });

  it("should update the dropdown to show closest matches when a patient name is typed in", async () => {
    const PATIENT_NAME = "Henry";

    render(<PatientLookup />);
    await act(() => new Promise(process.nextTick));
    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: PATIENT_NAME } });

    const dropdownOptions = screen.getAllByTestId("dropdownOption");
    expect(dropdownOptions.length).toBe(1);
    expect(dropdownOptions[0].textContent).toContain(PATIENT_NAME);
  });

  it("should call props.onSelect when a patient is selected from the dropdown", async () => {
    const selectHandler = vi.fn();
    render(<PatientLookup onSelect={selectHandler} />);
    await act(() => new Promise(process.nextTick));

    const dropdownOptions = screen.getAllByTestId("dropdownOption");
    fireEvent.click(dropdownOptions[0]);
    expect(selectHandler).toHaveBeenCalled();
  });
});
