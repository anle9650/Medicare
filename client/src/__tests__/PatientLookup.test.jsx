import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import PatientLookup from "../components/PatientLookup";

describe("PatientLookup", () => {
    it("should show the dropdown menu on focus", () => {
        render(<PatientLookup />);
        const input = screen.getByTestId("input");
        fireEvent.focus(input);
        const dropdown = screen.getByTestId("dropdown");
        expect(dropdown.className).not.toContain('hidden');
    });

    it("should hide the dropdown menu on blur", () => {
        render(<PatientLookup />);
        const input = screen.getByTestId("input");
        fireEvent.focus(input);
        fireEvent.blur(input);
        const dropdown = screen.getByTestId("dropdown");
        expect(dropdown.className).toContain('hidden');
    });

    it("should keep the dropdown menu open when blur event occurs while mousing over the menu", () => {
        render(<PatientLookup />);

        const input = screen.getByTestId("input");
        const dropdown = screen.getByTestId("dropdown");

        fireEvent.focus(input);
        fireEvent.mouseOver(dropdown);
        fireEvent.blur(input);

        expect(dropdown.className).not.toContain('hidden');
    });

    it("should close the dropdown menu open when blur event occurs after the mouse leaves the menu", () => {
        render(<PatientLookup />);

        const input = screen.getByTestId("input");
        const dropdown = screen.getByTestId("dropdown");

        fireEvent.focus(input);
        fireEvent.mouseOver(dropdown);
        fireEvent.mouseLeave(dropdown);
        fireEvent.blur(input);

        expect(dropdown.className).toContain('hidden');
    });
    
    it("should update the dropdown to show closest matches when a patient name is typed in", () => {
        const PATIENT_NAME = 'Henry';

        render(<PatientLookup />);
        const input = screen.getByTestId("input");
        fireEvent.change(input, {target: { value: PATIENT_NAME }});

        const dropdownOptions = screen.getAllByTestId("dropdownOption");
        expect(dropdownOptions.length).toBe(1);
        expect(dropdownOptions[0].textContent).toContain(PATIENT_NAME);
    });

    it("should call props.onSelect when a patient is selected from the dropdown", () => {
        const selectHandler = vi.fn();
        render(<PatientLookup onSelect={selectHandler} />);

        const dropdownOptions = screen.getAllByTestId("dropdownOption");
        fireEvent.click(dropdownOptions[0]);
        expect(selectHandler).toHaveBeenCalled();
    });
})