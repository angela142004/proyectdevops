/* eslint-env jest */
/* global jest */
import React from "react";
import { render, screen } from "@testing-library/react";
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
});
