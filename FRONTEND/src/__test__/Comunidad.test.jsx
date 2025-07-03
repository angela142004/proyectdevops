/* eslint-env jest */
/* global jest */
import React from "react";
import { render, screen } from "@testing-library/react";
import Comunidad from "../pages/Comunidad";

// Mock de AOS
jest.mock("aos", () => ({
  init: jest.fn(),
}));

// Mock de Swiper
jest.mock("swiper/react", () => ({
  Swiper: ({ children }) => <div data-testid="SwiperMock">{children}</div>,
  SwiperSlide: ({ children }) => (
    <div data-testid="SwiperSlideMock">{children}</div>
  ),
}));
jest.mock("swiper/css", () => {});
jest.mock("swiper/css/navigation", () => {});
jest.mock("swiper/css/pagination", () => {});
jest.mock("swiper/modules", () => ({
  Navigation: {},
  Pagination: {},
  Autoplay: {},
}));

// Mock de Crush1 y Footer
jest.mock("../components/Crush1", () => () => <div data-testid="Crush1" />);
jest.mock("../components/Footer", () => ({
  Footer: () => <div data-testid="Footer" />,
}));

describe("Comunidad Component", () => {
  test("renderiza secciones clave correctamente", () => {
    render(<Comunidad />);

    expect(screen.getByTestId("Crush1")).toBeInTheDocument();
    expect(screen.getByText(/Nuestros Profesores/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Testimonios de Padres de Familia/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Galería/i)).toBeInTheDocument();
    expect(screen.getByTestId("SwiperMock")).toBeInTheDocument();
    expect(screen.getByTestId("Footer")).toBeInTheDocument();
  });
});
