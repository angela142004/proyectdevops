// __tests__/SwiperMetodologia.test.jsx

import React from "react";
import { render, screen } from "@testing-library/react";
import SwiperMetodologia from "../components/SwiperMetodologia";

// Mock de Swiper
jest.mock("swiper/react", () => ({
  Swiper: ({ children }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }) => (
    <div data-testid="swiper-slide">{children}</div>
  ),
}));

jest.mock("swiper/modules", () => ({
  Pagination: jest.fn(),
  Autoplay: jest.fn(),
  EffectCoverflow: jest.fn(),
}));

describe("SwiperMetodologia Component", () => {
  beforeEach(() => {
    render(<SwiperMetodologia />);
  });

  it("renders the section title and subtitle", () => {
    expect(screen.getByText(/Metodología/i)).toBeInTheDocument();
    expect(screen.getByText(/Innovadora/i)).toBeInTheDocument();
  });

  it("renders all metodologías as slides", () => {
    const slides = screen.getAllByTestId("swiper-slide");
    expect(slides.length).toBe(5); // Porque el array "metodologia" tiene 5 ítems

    const expectedTitles = [
      "Aprendizaje activo",
      "Tecnología educativa",
      "Atención personalizada",
      "Formación en valores",
      "Aprendizaje colaborativo",
    ];

    expectedTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders "Conocer más" button in each slide', () => {
    const buttons = screen.getAllByText(/Conocer más/i);
    expect(buttons.length).toBe(5);
  });
});
