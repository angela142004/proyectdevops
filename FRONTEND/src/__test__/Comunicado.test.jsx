/* eslint-env jest */
/* global jest */ 
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Comunicados from "../pages/Comunicado.jsx";
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

import { describe, beforeEach, test, expect } from "@jest/globals";

// Mock de AOS
jest.mock("aos", () => ({ init: jest.fn() }));

jest.mock("../config/env.jsx", () => ({
  API_KEY: "fake-key",
  API_BASE_URL: "http://localhost:1234",
}));

// Mock de componentes externos
jest.mock("../components/Crush", () => () => <div data-testid="crush" />);
jest.mock("../components/Calendar", () => () => <div data-testid="calendar" />);
jest.mock("../components/Footer", () => ({
  Footer: () => <div data-testid="footer" />,
}));

describe("Comunicado Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    document.getElementById = jest
      .fn()
      .mockReturnValue({ scrollIntoView: jest.fn() });
  });

  test("muestra spinner mientras carga eventos", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));
    fetchMock.mockResponseOnce(JSON.stringify([]));

    render(<Comunicados />);
    expect(screen.getByText(/Cargando eventos/i)).toBeInTheDocument();
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
  });

  test("renderiza eventos y comunicados correctamente", async () => {
    const fakePosts = [
      {
        id: "1",
        title: "Evento X",
        start_at: "2025-06-10",
        end_at: "2025-06-12",
        images: [],
      },
    ];
    const fakeComu = [
      {
        id: "A",
        title: "Comunicado Uno",
        created_at: "2025-06-08",
        content: "Contenido...",
      },
    ];

    fetchMock
      .mockResponseOnce(JSON.stringify(fakePosts))
      .mockResponseOnce(JSON.stringify(fakeComu));

    render(<Comunicados />);

    expect(screen.getByText(/Cargando eventos/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Evento X")).toBeInTheDocument();
      expect(screen.getByText("Comunicado Uno")).toBeInTheDocument();
      expect(screen.getByTestId("calendar")).toBeInTheDocument();
      expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
  });

  test("muestra mensaje de error si falla fetch de eventos", async () => {
    fetchMock.mockRejectOnce(new Error("fail eventos"));
    fetchMock.mockResponseOnce(JSON.stringify([]));

    render(<Comunicados />);
    await waitFor(() =>
      expect(screen.getByText(/fail eventos/i)).toBeInTheDocument()
    );
  });

  test("el botón muestra el calendario al hacer click", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));
    fetchMock.mockResponseOnce(JSON.stringify([]));

    render(<Comunicados />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

    const btn = screen.getByRole("button", {
      name: /Ver Calendario Completo/i,
    });
    fireEvent.click(btn);
    await waitFor(() =>
      expect(document.getElementById).toHaveBeenCalledWith("calendar-section")
    );
  });
});
