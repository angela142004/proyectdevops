/* eslint-env jest */
/* global jest */
import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect } from "@jest/globals";
import Blog from "../pages/Blog";

// Mocks de los componentes hijos
jest.mock("../components/ContBlog", () => () => <div data-testid="Fondo" />);
jest.mock("../components/Seccion_Padres", () => () => (
  <div data-testid="SeccionPadres" />
));
jest.mock("../components/Seccion_Ingresantes", () => () => (
  <div data-testid="SeccionIngresantes" />
));
jest.mock("../components/Inicioescolar", () => () => (
  <div data-testid="InicioEscolar" />
));
jest.mock("../components/sedes", () => () => (
  <div data-testid="WelcomeVideo" />
));
jest.mock("../components/Footer", () => ({
  Footer: () => <div data-testid="Footer" />,
}));
jest.mock("../components/Blog_post", () => () => (
  <div data-testid="BlogPost" />
));

describe("Blog Component", () => {
  test("renderiza todos los componentes hijos correctamente", () => {
    render(<Blog />);

    expect(screen.getByTestId("Fondo")).toBeInTheDocument();
    expect(screen.getByTestId("BlogPost")).toBeInTheDocument();
    expect(screen.getByTestId("SeccionPadres")).toBeInTheDocument();
    expect(screen.getByTestId("SeccionIngresantes")).toBeInTheDocument();
    expect(screen.getByTestId("InicioEscolar")).toBeInTheDocument();
    expect(screen.getByTestId("WelcomeVideo")).toBeInTheDocument();
    expect(screen.getByTestId("Footer")).toBeInTheDocument();
  });

  test("Fondo se renderiza correctamente", () => {
    render(<Blog />);
    expect(screen.getByTestId("Fondo")).toBeInTheDocument();
  });

  test("Blog_post se renderiza correctamente", () => {
    render(<Blog />);
    expect(screen.getByTestId("BlogPost")).toBeInTheDocument();
  });

  test("SeccionPadres se renderiza correctamente", () => {
    render(<Blog />);
    expect(screen.getByTestId("SeccionPadres")).toBeInTheDocument();
  });

  test("SeccionIngresantes se renderiza correctamente", () => {
    render(<Blog />);
    expect(screen.getByTestId("SeccionIngresantes")).toBeInTheDocument();
  });

  test("InicioEscolar se renderiza correctamente", () => {
    render(<Blog />);
    expect(screen.getByTestId("InicioEscolar")).toBeInTheDocument();
  });

  test("WelcomeVideo se renderiza correctamente", () => {
    render(<Blog />);
    expect(screen.getByTestId("WelcomeVideo")).toBeInTheDocument();
  });

  test("Footer se renderiza correctamente", () => {
    render(<Blog />);
    expect(screen.getByTestId("Footer")).toBeInTheDocument();
  });
});
