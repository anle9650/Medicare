import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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
})