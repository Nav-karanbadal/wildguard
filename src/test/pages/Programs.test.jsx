import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi, beforeEach } from "vitest"

import Programs from "../../pages/Programs"

const { mockDispatch } = vi.hoisted(() => ({
  mockDispatch: vi.fn(),
}))

const mockPrograms = [
  {
    ID: "1",
    "Program Name": "Project Tiger",
    "Country/Region": "India",
    "Government Agency": "Government of India",
    Description: "A program focused on protecting tiger populations and habitats.",
    "Objectives and Goals": "Protect tigers and restore habitats.",
    "Year Launched": "1973",
    "Current Status": "Ongoing",
    "Funding (USD)": "1000000",
    Duration: "Long Term",
    "Target Species/Ecosystems": "Bengal Tiger",
  },
  {
    ID: "2",
    "Program Name": "Elephant Conservation Program",
    "Country/Region": "India",
    "Government Agency": "Ministry of Environment",
    Description: "A conservation program supporting elephant habitats.",
    "Objectives and Goals": "Protect elephants and their ecosystems.",
    "Year Launched": "1992",
    "Current Status": "Successful",
    "Funding (USD)": "800000",
    Duration: "Long Term",
    "Target Species/Ecosystems": "Asian Elephant",
  },
  {
    ID: "3",
    "Program Name": "Rhino Recovery Initiative",
    "Country/Region": "Nepal",
    "Government Agency": "National Parks Authority",
    Description: "An initiative focused on rhinoceros recovery.",
    "Objectives and Goals": "Increase rhino populations.",
    "Year Launched": "2005",
    "Current Status": "Recovery",
    "Funding (USD)": "600000",
    Duration: "10 Years",
    "Target Species/Ecosystems": "Greater One-Horned Rhino",
  },
  {
    ID: "4",
    "Program Name": "Forest Restoration Project",
    "Country/Region": "Brazil",
    "Government Agency": "Environmental Agency",
    Description: "A project restoring important forest ecosystems.",
    "Objectives and Goals": "Restore forests and biodiversity.",
    "Year Launched": "2010",
    "Current Status": "Progress",
    "Funding (USD)": "900000",
    Duration: "15 Years",
    "Target Species/Ecosystems": "Rainforest Ecosystems",
  },
  {
    ID: "5",
    "Program Name": "Ocean Wildlife Protection",
    "Country/Region": "Australia",
    "Government Agency": "Marine Authority",
    Description: "A program protecting marine wildlife and ecosystems.",
    "Objectives and Goals": "Protect marine biodiversity.",
    "Year Launched": "2015",
    "Current Status": "Mixed Results",
    "Funding (USD)": "700000",
    Duration: "8 Years",
    "Target Species/Ecosystems": "Marine Ecosystems",
  },
]

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,

  useSelector: (selector) =>
    selector({
      programs: {
        programs: mockPrograms,
        loading: false,
        error: null,
      },
    }),
}))

vi.mock("../../redux/programSlice", () => ({
  getPrograms: vi.fn(() => ({
    type: "programs/getPrograms",
  })),
}))

vi.mock("../../components/ProgramCard/ProgramCard", () => ({
  default: ({ program }) => (
    <div data-testid="program-card">
      <h3>{program.title}</h3>
      <p>{program.status}</p>
      <p>{program.country}</p>
    </div>
  ),
}))

describe("Programs", () => {
  beforeEach(() => {
    mockDispatch.mockClear()
  })

  it("renders the Programs page and requests program data", () => {
    render(<Programs />)

    expect(
      screen.getByRole("heading", {
        name: /programs that/i,
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText("Turning Conservation Into Action")
    ).toBeInTheDocument()

    expect(mockDispatch).toHaveBeenCalled()
  })

  it("displays program data and statistics", () => {
    render(<Programs />)

    expect(
      screen.getByText("Project Tiger")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Elephant Conservation Program")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Rhino Recovery Initiative")
    ).toBeInTheDocument()

    expect(
      screen.getByText("5", { selector: "p" })
    ).toBeInTheDocument()

    expect(
      screen.getByText("Total Programs")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Countries / Regions")
    ).toBeInTheDocument()
  })

  it("filters programs when searching by program name", async () => {
    const user = userEvent.setup()

    render(<Programs />)

    const searchInput = screen.getByLabelText(
      "Search Programs"
    )

    await user.type(searchInput, "Tiger")

    expect(
      screen.getByText("Project Tiger")
    ).toBeInTheDocument()

    expect(
      screen.queryByText("Elephant Conservation Program")
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText("Rhino Recovery Initiative")
    ).not.toBeInTheDocument()
  })

  it("filters programs by category and shows more programs", async () => {
    const user = userEvent.setup()

    render(<Programs />)

    await user.click(
      screen.getByRole("button", {
        name: "Successful",
      })
    )

    expect(
      screen.getByText("Elephant Conservation Program")
    ).toBeInTheDocument()

    expect(
      screen.queryByText("Project Tiger")
    ).not.toBeInTheDocument()

    await user.click(
      screen.getByRole("button", {
        name: "All Programs",
      })
    )

    expect(
      screen.getByRole("button", {
        name: "View More Programs",
      })
    ).toBeInTheDocument()

    expect(
      screen.getAllByTestId("program-card")
    ).toHaveLength(4)

    await user.click(
      screen.getByRole("button", {
        name: "View More Programs",
      })
    )

    expect(
      screen.getAllByTestId("program-card")
    ).toHaveLength(5)

    expect(
      screen.getByRole("button", {
        name: "Show Less",
      })
    ).toBeInTheDocument()
  })
})