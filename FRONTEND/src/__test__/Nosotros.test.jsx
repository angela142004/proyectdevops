/* eslint-env jest */
/* global jest */
import React from "react";
import { render, screen } from "@testing-library/react";
import Nosotros from "../pages/Nosotros";

// Mock de AOS
jest.mock("aos", () => ({
  init: jest.fn(),
  refresh: jest.fn(),
}));

// Mock de Footer (opcional)
jest.mock("../components/Footer", () => ({
  Footer: () => <div data-testid="Footer" />,
}));

describe("Nosotros Component", () => {
  test("renderiza secciones clave correctamente", () => {
    render(<Nosotros />);

    // 1. Título principal
    expect(screen.getByText(/Ven conócenos/i)).toBeInTheDocument();

    // 2. Equipo Directivo
    expect(
      screen.getByRole("heading", {
        name: /nuestro.*equipo.*directivo/i,
      })
    ).toBeInTheDocument();

    // 3. Himno Institucional (usa getAllByText)
    const himnoElements = screen.getAllByText(/Himno Institucional/i);
    expect(himnoElements.length).toBeGreaterThan(0);
  });
});
