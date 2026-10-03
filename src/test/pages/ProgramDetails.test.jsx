import { render, screen } from "@testing-library/react"
import { describe, it, expect, beforeEach, vi } from "vitest"
import { MemoryRouter } from "react-router-dom"

import ProgramDetails from "../../pages/ProgramDetails"

import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}))

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")

  return {
    ...actual,
    useParams: vi.fn(),
  }
})

const mockDispatch = vi.fn()

const mockProgram = {
  ID: "1",
  "Program Name": "Project Tiger",
  "Country/Region": "India",
  "Government Agency": "Ministry of Environment",
  Description:
    "A conservation program focused on protecting tiger populations and their habitats.",
  "Objectives and Goals":
    "To protect tiger populations, restore habitats and reduce threats.",
  "Year Launched": "1973",
  "Current Status": "Ongoing",
  "Funding (USD)": "1000000",
  Duration: "Long Term",
  "Target Species/Ecosystems":
    "Bengal Tiger and forest ecosystems",
}

function renderProgramDetails(state = {}) {
  useSelector.mockReturnValue({
    programs: [],
    loading: false,
    error: null,
    ...state,
  })

  return render(
    <MemoryRouter initialEntries={["/programs/1"]}>
      <ProgramDetails />
    </MemoryRouter>
  )
}

describe("ProgramDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks()

    useDispatch.mockReturnValue(mockDispatch)

    useParams.mockReturnValue({
      id: "1",
    })
  })

  it("loads and displays program details", () => {
    renderProgramDetails({
      programs: [mockProgram],
      loading: false,
      error: null,
    })

    expect(
      screen.getByRole("heading", {
        name: "Project Tiger",
        level: 1,
      })
    ).toBeInTheDocument()

    expect(
      screen.getAllByText("Ongoing")
    ).toHaveLength(2)

    expect(
      screen.getByText(
        "A conservation program focused on protecting tiger populations and their habitats."
      )
    ).toBeInTheDocument()
  })

  it("displays objectives and target species information", () => {
    renderProgramDetails({
      programs: [mockProgram],
      loading: false,
      error: null,
    })

    expect(
      screen.getByRole("heading", {
        name: "Objectives and Goals",
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        "To protect tiger populations, restore habitats and reduce threats."
      )
    ).toBeInTheDocument()

    expect(
      screen.getByRole("heading", {
        name: "Target Species / Ecosystems",
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        "Bengal Tiger and forest ecosystems"
      )
    ).toBeInTheDocument()
  })

  it("displays program information", () => {
    renderProgramDetails({
      programs: [mockProgram],
      loading: false,
      error: null,
    })

    expect(
      screen.getByText("Government Agency")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Ministry of Environment")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Country / Region")
    ).toBeInTheDocument()

    expect(
      screen.getByText("India")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Year Launched")
    ).toBeInTheDocument()

    expect(
      screen.getByText("1973")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Duration")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Long Term")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Funding")
    ).toBeInTheDocument()

    expect(
      screen.getByText("1000000")
    ).toBeInTheDocument()

    expect(
      screen.getByRole("link", {
        name: "Get Involved",
      })
    ).toBeInTheDocument()
  })

  it("shows an error when program details cannot be loaded", () => {
    renderProgramDetails({
      programs: [],
      loading: false,
      error: "Failed to load programs",
    })

    expect(
      screen.getByRole("heading", {
        name: "Unable to Load Program",
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText("Failed to load programs")
    ).toBeInTheDocument()

    expect(
      screen.getByRole("link", {
        name: "Back to Programs",
      })
    ).toBeInTheDocument()
  })

  it("shows an error when the requested program does not exist", () => {
    renderProgramDetails({
      programs: [
        {
          ...mockProgram,
          ID: "999",
        },
      ],
      loading: false,
      error: null,
    })

    expect(
      screen.getByRole("heading", {
        name: "Program Not Found",
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        "The conservation program you are looking for does not exist."
      )
    ).toBeInTheDocument()

    expect(
      screen.getByRole("link", {
        name: "Back to Programs",
      })
    ).toBeInTheDocument()
  })
})