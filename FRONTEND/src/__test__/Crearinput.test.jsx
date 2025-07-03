import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Crearinput from "../components/dashboard/components/paneles/Crearinput.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

// ✅ Mock de variables de entorno
jest.mock("../config/env.jsx", () => ({
  API_KEY: "fake-key",
  API_BASE_URL: "http://localhost:1234",
}));

// ✅ Mock de editor Markdown
jest.mock("@uiw/react-md-editor", () => ({ value, onChange }) => (
  <textarea
    data-testid="md-editor"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
));

// ✅ Mock de Supabase
jest.mock("../supas/supabaseClient.js", () => ({
  supabase: {
    storage: {
      from: () => ({
        upload: jest.fn(() => ({ data: {}, error: null })),
        getPublicUrl: jest.fn(() => ({
          data: { publicUrl: "http://img.url/test.png" },
        })),
      }),
    },
  },
}));

// ✅ Mock de fetch global
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ id: "1234", success: true }),
  })
);

// ✅ Mocks necesarios para JSDOM
beforeAll(() => {
  global.URL.createObjectURL = jest.fn(
    () => "blob:http://localhost/fake-image"
  );
  global.URL.revokeObjectURL = jest.fn();
});

describe("Crearinput Component", () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();
  const contextValue = { user: { id: "u1" } };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem("jwtToken", "fake-token");
    render(
      <AuthContext.Provider value={contextValue}>
        <Crearinput
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          Tipo="Blog"
        />
      </AuthContext.Provider>
    );
  });

  it("shows title and buttons initial state", () => {
    expect(
      screen.getByRole("heading", { name: /crear blog/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancelar/i })).toBeEnabled();
    expect(screen.getByRole("button", { name: /crear blog/i })).toBeEnabled();
  });

  it("handles selecting and removing images", async () => {
    const file = new File(["dummy"], "img.png", { type: "image/png" });
    const input = screen.getByLabelText(/seleccionar archivos/i);

    fireEvent.change(input, { target: { files: [file] } });
    await waitFor(() =>
      expect(screen.getByAltText("Preview 1")).toBeInTheDocument()
    );

    expect(screen.getByText("img.png")).toBeInTheDocument();
    fireEvent.click(screen.getByTitle("Eliminar imagen"));

    await waitFor(() =>
      expect(screen.queryByAltText("Preview 1")).not.toBeInTheDocument()
    );
  });

  it("submits data after filling form and triggers onSubmit", async () => {
    fireEvent.change(screen.getByPlaceholderText(/título del blog/i), {
      target: { value: "Hola Test" },
    });

    fireEvent.click(screen.getByRole("button", { name: /crear blog/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
    await waitFor(() => expect(mockOnClose).toHaveBeenCalled());
  });
});
