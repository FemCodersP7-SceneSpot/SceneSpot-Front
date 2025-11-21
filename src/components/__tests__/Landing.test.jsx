import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import LandingPage from "../../pages/Landing";

vi.mock("../../services/tmbdService", () => ({
  getPopularMovies: vi.fn().mockResolvedValue([]),
  searchMovies: vi.fn().mockResolvedValue([]),
}));

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

describe("LandingPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText((content) => content.includes("Step"))
    ).toBeInTheDocument();
  });

  it("shows search input", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(
      screen.getByPlaceholderText("Search for a movie...")
    ).toBeInTheDocument();
  });

  it("updates search input when typing", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Search for a movie...");
    fireEvent.change(input, { target: { value: "inception" } });

    expect(input.value).toBe("inception");
  });
});
