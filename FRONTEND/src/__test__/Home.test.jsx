/* eslint-env jest */
/* global jest */
import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";

// Mock de todos los componentes usados en Home
jest.mock("../components/Hero", () => () => <div data-testid="Hero" />);
jest.mock("../components/Base", () => () => <div data-testid="Base" />);
jest.mock("../components/Level", () => () => <div data-testid="Level" />);
jest.mock("../components/Testimonials", () => () => (
  <div data-testid="Testimonials" />
));
jest.mock("../components/Contact", () => () => <div data-testid="Contact" />);
jest.mock("../components/Footer", () => ({
  Footer: () => <div data-testid="Footer" />,
}));

describe("Home Component", () => {
  test("renderiza todos los componentes hijos correctamente", () => {
    render(<Home />);

    expect(screen.getByTestId("Hero")).toBeInTheDocument();
    expect(screen.getByTestId("Base")).toBeInTheDocument();
    expect(screen.getByTestId("Testimonials")).toBeInTheDocument();
    expect(screen.getByTestId("Contact")).toBeInTheDocument();
    expect(screen.getByTestId("Footer")).toBeInTheDocument();
  });
});
