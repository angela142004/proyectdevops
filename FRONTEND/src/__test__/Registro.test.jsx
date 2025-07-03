// __tests__/Registro.test.jsx

import React from "react";
import { render, screen } from "@testing-library/react";
import Registro from "../pages/Registro";

// Mock de componentes hijos
jest.mock("../components/Level", () => () => (
  <div data-testid="level-component" />
));
jest.mock("../components/Propuesta_edu", () => () => (
  <div data-testid="propuesta-edu-component" />
));
jest.mock("../components/SwiperMetodologia", () => () => (
  <div data-testid="swiper-metodologia-component" />
));
jest.mock("../components/Footer", () => ({
  Footer: () => <div data-testid="footer-component" />,
}));

describe("Registro Component", () => {
  it("renders all child components inside a div", () => {
    render(<Registro />);

    expect(screen.getByTestId("level-component")).toBeInTheDocument();
    expect(screen.getByTestId("propuesta-edu-component")).toBeInTheDocument();
    expect(
      screen.getByTestId("swiper-metodologia-component")
    ).toBeInTheDocument();
    expect(screen.getByTestId("footer-component")).toBeInTheDocument();
  });
});
