// __tests__/Home.test.jsx

/* eslint-env jest */
/* global jest */
import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";

// Mockeamos todos los componentes hijos
jest.mock("../components/Hero", () => () => (
  <div data-testid="hero-component" />
));
jest.mock("../components/Base", () => () => (
  <div data-testid="educational-pillars-component" />
));
jest.mock("../components/Level", () => () => (
  <div data-testid="level-component" />
));
jest.mock("../components/Footer", () => ({
  Footer: () => <div data-testid="footer-component" />,
}));
jest.mock("../components/Testimonials", () => () => (
  <div data-testid="testimonials-component" />
));
jest.mock("../components/Contact", () => () => (
  <div data-testid="contact-component" />
));

describe("Home Component", () => {
  it("renders all child components inside <main>", () => {
    render(<Home />);

    expect(screen.getByTestId("hero-component")).toBeInTheDocument();
    expect(
      screen.getByTestId("educational-pillars-component")
    ).toBeInTheDocument();
    expect(screen.getByTestId("testimonials-component")).toBeInTheDocument();
    expect(screen.getByTestId("contact-component")).toBeInTheDocument();
    expect(screen.getByTestId("footer-component")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
