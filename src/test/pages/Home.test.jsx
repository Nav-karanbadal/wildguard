import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"

import Home from "../../pages/Home"

vi.mock("../../components/Hero/Hero", () => ({
  default: () => (
    <section data-testid="hero-section">
      Hero Section
    </section>
  ),
}))

vi.mock("../../components/Mission/Mission", () => ({
  default: () => (
    <section data-testid="mission-section">
      Mission Section
    </section>
  ),
}))

vi.mock("../../components/Impact/Impact", () => ({
  default: () => (
    <section data-testid="impact-section">
      Impact Section
    </section>
  ),
}))

vi.mock("../../components/FeaturedWildlife/FeaturedWildlife", () => ({
  default: () => (
    <section data-testid="featured-wildlife-section">
      Featured Wildlife Section
    </section>
  ),
}))

vi.mock("../../components/ProgramsPreview/ProgramsPreview", () => ({
  default: () => (
    <section data-testid="programs-preview-section">
      Programs Preview Section
    </section>
  ),
}))

vi.mock("../../components/BlogPreview/BlogPreview", () => ({
  default: () => (
    <section data-testid="blog-preview-section">
      Blog Preview Section
    </section>
  ),
}))

vi.mock("../../components/CallToAction/CallToAction", () => ({
  default: () => (
    <section data-testid="call-to-action-section">
      Call To Action Section
    </section>
  ),
}))

describe("Home", () => {
  it("renders all main sections of the Home page", () => {
    render(<Home />)

    expect(
      screen.getByTestId("hero-section")
    ).toBeInTheDocument()

    expect(
      screen.getByTestId("mission-section")
    ).toBeInTheDocument()

    expect(
      screen.getByTestId("impact-section")
    ).toBeInTheDocument()

    expect(
      screen.getByTestId("featured-wildlife-section")
    ).toBeInTheDocument()

    expect(
      screen.getByTestId("programs-preview-section")
    ).toBeInTheDocument()

    expect(
      screen.getByTestId("blog-preview-section")
    ).toBeInTheDocument()

    expect(
      screen.getByTestId("call-to-action-section")
    ).toBeInTheDocument()
  })

  it("renders the Home sections in the correct order", () => {
    render(<Home />)

    const hero = screen.getByTestId("hero-section")
    const mission = screen.getByTestId("mission-section")
    const impact = screen.getByTestId("impact-section")
    const featuredWildlife = screen.getByTestId(
      "featured-wildlife-section"
    )
    const programsPreview = screen.getByTestId(
      "programs-preview-section"
    )
    const blogPreview = screen.getByTestId(
      "blog-preview-section"
    )
    const callToAction = screen.getByTestId(
      "call-to-action-section"
    )

    expect(
      hero.compareDocumentPosition(mission) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()

    expect(
      mission.compareDocumentPosition(impact) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()

    expect(
      impact.compareDocumentPosition(featuredWildlife) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()

    expect(
      featuredWildlife.compareDocumentPosition(programsPreview) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()

    expect(
      programsPreview.compareDocumentPosition(blogPreview) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()

    expect(
      blogPreview.compareDocumentPosition(callToAction) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
  })
})