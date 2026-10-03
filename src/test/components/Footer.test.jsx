import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { MemoryRouter } from "react-router-dom"

import Footer from "../../components/Footer/Footer"

describe("Footer", () => {
  it("renders the footer branding and main content", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )

    expect(
      screen.getByRole("heading", {
        name: /WildGuard/,
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText("Protect. Preserve. Coexist.")
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        /A cleaner, greener and safer world for wildlife and future generations/
      )
    ).toBeInTheDocument()

    expect(
      screen.getByRole("heading", {
        name: "Quick Links",
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole("heading", {
        name: "Resources",
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole("heading", {
        name: "Stay Connected",
      })
    ).toBeInTheDocument()
  })

  it("renders all Quick Links and Resource links", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )

    const homeLinks = screen.getAllByRole("link", {
      name: "Home",
    })

    expect(homeLinks.length).toBeGreaterThanOrEqual(1)

    expect(
      screen.getAllByRole("link", {
        name: "Wildlife",
      }).length
    ).toBeGreaterThanOrEqual(1)

    expect(
      screen.getAllByRole("link", {
        name: "Programs",
      }).length
    ).toBeGreaterThanOrEqual(1)

    expect(
      screen.getAllByRole("link", {
        name: "Blog",
      }).length
    ).toBeGreaterThanOrEqual(1)

    expect(
      screen.getByRole("link", {
        name: "Join Team",
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole("link", {
        name: "Contact",
      })
    ).toBeInTheDocument()

    expect(
      screen.getAllByRole("link", {
        name: "Wildlife",
      })[0]
    ).toHaveAttribute("href", "/wildlife")

    expect(
      screen.getAllByRole("link", {
        name: "Programs",
      })[0]
    ).toHaveAttribute("href", "/programs")

    expect(
      screen.getAllByRole("link", {
        name: "Blog",
      })[0]
    ).toHaveAttribute("href", "/blog")
  })

  it("renders social links and newsletter form", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )

    expect(
      screen.getByRole("link", {
        name: "Facebook",
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole("link", {
        name: "Instagram",
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole("link", {
        name: "X",
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole("link", {
        name: "YouTube",
      })
    ).toBeInTheDocument()

    const emailInput = screen.getByPlaceholderText(
      "Enter your email"
    )

    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute("type", "email")

    expect(
      screen.getByRole("button", {
        name: "Subscribe",
      })
    ).toBeInTheDocument()
  })
})