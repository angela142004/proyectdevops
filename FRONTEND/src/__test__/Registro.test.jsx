/* eslint-env jest */
/* global jest */
import React from "react";
import { render, screen } from "@testing-library/react";
import Registro from "../pages/Registro";

// Mock de componentes hijos
jest.mock("../components/Level", () => () => <div data-testid="Level" />);
jest.mock("../components/Propuesta_edu", () => () => (
  <div data-testid="PropuestaEdu" />
));
jest.mock("../components/SwiperMetodologia", () => () => (
  <div data-testid="SwiperMetodologia" />
));
jest.mock("../components/Footer", () => ({
  Footer: () => <div data-testid="Footer" />,
}));

describe("Registro Component", () => {
  test("renderiza todos los componentes hijos correctamente", () => {
    render(<Registro />);

    expect(screen.getByTestId("Level")).toBeInTheDocument();
    expect(screen.getByTestId("PropuestaEdu")).toBeInTheDocument();
    expect(screen.getByTestId("SwiperMetodologia")).toBeInTheDocument();
    expect(screen.getByTestId("Footer")).toBeInTheDocument();
  });
});
