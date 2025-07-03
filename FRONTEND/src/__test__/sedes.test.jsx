// __tests__/WelcomeVideo.test.jsx

import React from "react";
import { render, screen } from "@testing-library/react";
import WelcomeVideo from "../components/sedes.jsx";


// Mock de AOS
jest.mock("aos", () => ({
  init: jest.fn(),
}));

jest.mock("../config/env.jsx", () => ({
  API_BASE_URL: "http://localhost:4001",
  API_KEY: "test_api_key",
}));


describe("WelcomeVideo Component", () => {
  beforeEach(() => {
    render(<WelcomeVideo />);
  });

  it("renders the main title and subtitle", () => {
    expect(screen.getByText(/Nuestro Reconocimiento/i)).toBeInTheDocument();
    expect(screen.getByText(/¡BIENVENIDO!/i)).toBeInTheDocument();
  });

  it("renders the main iframe video", () => {
    const mainVideo = screen.getByTitle("Video institucional Colegio Prisma");
    expect(mainVideo).toBeInTheDocument();
    expect(mainVideo).toHaveAttribute(
      "src",
      expect.stringContaining("youtube.com/embed/4ZXV4uexlTU")
    );
  });

  it("renders all extra videos", () => {
    const extraVideoTitles = [
      "Reconocimiento Regional",
      "Ceremonia de Mérito",
      "Celebración Aniversario",
    ];

    extraVideoTitles.forEach((title) => {
      const iframe = screen.getByTitle(title);
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute(
        "src",
        expect.stringContaining("youtube.com/embed/")
      );
    });
  });
});
