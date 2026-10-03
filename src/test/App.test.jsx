import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { MemoryRouter } from "react-router-dom"

import App from "../App"

vi.mock("../components/Navbar/Navbar", () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}))

vi.mock("../components/Footer/Footer", () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}))

vi.mock("../components/ScrollToTop/ScrollToTop", () => ({
  default: () => null,
}))

vi.mock("../pages/Home", () => ({
  default: () => <div>Home Page</div>,
}))

vi.mock("../pages/Wildlife", () => ({
  default: () => <div>Wildlife Page</div>,
}))

vi.mock("../pages/WildlifeDetails", () => ({
  default: () => <div>Wildlife Details Page</div>,
}))

vi.mock("../pages/Programs", () => ({
  default: () => <div>Programs Page</div>,
}))

vi.mock("../pages/ProgramDetails", () => ({
  default: () => <div>Program Details Page</div>,
}))

vi.mock("../pages/Blog", () => ({
  default: () => <div>Blog Page</div>,
}))

vi.mock("../pages/BlogDetails", () => ({
  default: () => <div>Blog Details Page</div>,
}))

vi.mock("../pages/JoinTeam", () => ({
  default: () => <div>Join Team Page</div>,
}))

vi.mock("../pages/Contact", () => ({
  default: () => <div>Contact Page</div>,
}))

function renderApp(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  )
}

describe("App", () => {
  it("renders the Home page for the root route", () => {
    renderApp("/")

    expect(
      screen.getByText("Home Page")
    ).toBeInTheDocument()
  })

  it("renders the Wildlife page", () => {
    renderApp("/wildlife")

    expect(
      screen.getByText("Wildlife Page")
    ).toBeInTheDocument()
  })

  it("renders the Wildlife Details page", () => {
    renderApp("/wildlife/1")

    expect(
      screen.getByText("Wildlife Details Page")
    ).toBeInTheDocument()
  })

  it("renders the Programs page", () => {
    renderApp("/programs")

    expect(
      screen.getByText("Programs Page")
    ).toBeInTheDocument()
  })

  it("renders the Program Details page", () => {
    renderApp("/programs/1")

    expect(
      screen.getByText("Program Details Page")
    ).toBeInTheDocument()
  })

  it("renders the Blog page", () => {
    renderApp("/blog")

    expect(
      screen.getByText("Blog Page")
    ).toBeInTheDocument()
  })

  it("renders the Blog Details page", () => {
    renderApp("/blog/1")

    expect(
      screen.getByText("Blog Details Page")
    ).toBeInTheDocument()
  })

  it("renders the Join Team page", () => {
    renderApp("/join")

    expect(
      screen.getByText("Join Team Page")
    ).toBeInTheDocument()
  })

  it("renders the Contact page", () => {
    renderApp("/contact")

    expect(
      screen.getByText("Contact Page")
    ).toBeInTheDocument()
  })

  it("renders the Navbar and Footer on every route", () => {
    renderApp("/")

    expect(
      screen.getByTestId("navbar")
    ).toBeInTheDocument()

    expect(
      screen.getByTestId("footer")
    ).toBeInTheDocument()
  })
})