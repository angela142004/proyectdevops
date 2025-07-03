/* eslint-env jest */
import { render, screen, waitFor } from "@testing-library/react";
import Blog_post from "../components/Blog_post";
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();
import { describe, beforeEach, test, expect } from "@jest/globals";

jest.mock("aos", () => ({ init: jest.fn() }));
jest.mock("../config/env.jsx", () => ({
  API_KEY: "fake-key",
  API_BASE_URL: "http://localhost:1234",
}));
jest.mock("antd", () => ({
  Pagination: ({ current, pageSize, total, onChange }) => (
    <div data-testid="pagination" />
  ),
}));
jest.mock("../assets/blog_post1.jpg", () => "img-mock.jpg");
jest.mock("react-router-dom", () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe("Blog_post Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("muestra spinner mientras carga publicaciones", async () => {
    fetchMock.mockResponseOnce(() => new Promise(() => {})); // never resolves
    render(<Blog_post />);
    expect(screen.getByText(/Cargando publicaciones/i)).toBeInTheDocument();
  });

  test("renderiza publicaciones correctamente", async () => {
    const fakePosts = [
      {
        id: "1",
        title: "Post de prueba",
        created_at: "2025-06-10",
        images: [],
      },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(fakePosts));
    render(<Blog_post />);
    await waitFor(() => {
      expect(screen.getByText("Post de prueba")).toBeInTheDocument();
      expect(screen.getByTestId("pagination")).toBeInTheDocument();
    });
  });

  test("muestra mensaje de error si falla fetch", async () => {
    fetchMock.mockRejectOnce(new Error("fail blog"));
    render(<Blog_post />);
    await waitFor(() =>
      expect(screen.getByText(/fail blog/i)).toBeInTheDocument()
    );
  });
});
