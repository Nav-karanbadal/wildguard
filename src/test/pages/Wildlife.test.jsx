import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi, beforeEach } from "vitest"

import Wildlife from "../../pages/Wildlife"

const { mockDispatch } = vi.hoisted(() => ({
  mockDispatch: vi.fn(),
}))

const mockAnimals = [
  {
    ID: "1",
    "Animal Name": "Bengal Tiger",
    Species: "Panthera tigris",
    Habitat: "Forests",
    Diet: "Carnivore",
    "Conservation Status": "Endangered",
    "Average Lifespan (Years)": "15",
    "Weight (kg)": "220",
    "Height (cm)": "100",
    "Speed (km/h)": "65",
  },
  {
    ID: "2",
    "Animal Name": "African Elephant",
    Species: "Loxodonta africana",
    Habitat: "Grasslands",
    Diet: "Herbivore",
    "Conservation Status": "Vulnerable",
    "Average Lifespan (Years)": "60",
    "Weight (kg)": "6000",
    "Height (cm)": "330",
    "Speed (km/h)": "40",
  },
  {
    ID: "3",
    "Animal Name": "Snow Leopard",
    Species: "Panthera uncia",
    Habitat: "Mountains",
    Diet: "Carnivore",
    "Conservation Status": "Vulnerable",
    "Average Lifespan (Years)": "15",
    "Weight (kg)": "55",
    "Height (cm)": "60",
    "Speed (km/h)": "55",
  },
  {
    ID: "4",
    "Animal Name": "Polar Bear",
    Species: "Ursus maritimus",
    Habitat: "Arctic",
    Diet: "Carnivore",
    "Conservation Status": "Vulnerable",
    "Average Lifespan (Years)": "30",
    "Weight (kg)": "600",
    "Height (cm)": "160",
    "Speed (km/h)": "40",
  },
  {
    ID: "5",
    "Animal Name": "Blue Whale",
    Species: "Balaenoptera musculus",
    Habitat: "Ocean",
    Diet: "Carnivore",
    "Conservation Status": "Endangered",
    "Average Lifespan (Years)": "90",
    "Weight (kg)": "150000",
    "Height (cm)": "300",
    "Speed (km/h)": "50",
  },
  {
    ID: "6",
    "Animal Name": "Indian Star Tortoise",
    Species: "Geochelone elegans",
    Habitat: "Grasslands",
    Diet: "Herbivore",
    "Conservation Status": "Vulnerable",
    "Average Lifespan (Years)": "30",
    "Weight (kg)": "7",
    "Height (cm)": "25",
    "Speed (km/h)": "0.3",
  },
  {
    ID: "7",
    "Animal Name": "Giant Panda",
    Species: "Ailuropoda melanoleuca",
    Habitat: "Forests",
    Diet: "Herbivore",
    "Conservation Status": "Vulnerable",
    "Average Lifespan (Years)": "20",
    "Weight (kg)": "100",
    "Height (cm)": "90",
    "Speed (km/h)": "32",
  },
]

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,

  useSelector: (selector) =>
    selector({
      wildlife: {
        animals: mockAnimals,
        loading: false,
        error: null,
      },
    }),
}))

vi.mock("../../redux/wildlifeSlice", () => ({
  getWildlife: vi.fn(() => ({
    type: "wildlife/getWildlife",
  })),
}))

vi.mock("../../components/WildlifeCard/WildlifeCard", () => ({
  default: ({ animal }) => (
    <div data-testid="wildlife-card">
      <h3>{animal.name}</h3>
      <p>{animal.status}</p>
    </div>
  ),
}))

vi.mock("../../components/WildlifeCharts/WildlifeCharts", () => ({
  default: () => (
    <div data-testid="wildlife-charts">
      Wildlife Charts
    </div>
  ),
}))

describe("Wildlife", () => {
  beforeEach(() => {
    mockDispatch.mockClear()
  })

  it("renders the Wildlife page and requests wildlife data", () => {
    render(<Wildlife />)

    expect(
      screen.getByRole("heading", {
        name: /discover the wildlife/i,
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText("Wildlife We Protect")
    ).toBeInTheDocument()

    expect(mockDispatch).toHaveBeenCalled()
  })

  it("displays wildlife data", () => {
    render(<Wildlife />)

    expect(
      screen.getByText("Bengal Tiger")
    ).toBeInTheDocument()

    expect(
      screen.getByText("African Elephant")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Snow Leopard")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Wildlife Charts")
    ).toBeInTheDocument()
  })

  it("filters wildlife when searching by animal name", async () => {
    const user = userEvent.setup()

    render(<Wildlife />)

    const searchInput = screen.getByLabelText(
      "Search Wildlife"
    )

    await user.type(searchInput, "Tiger")

    expect(
      screen.getByText("Bengal Tiger")
    ).toBeInTheDocument()

    expect(
      screen.queryByText("African Elephant")
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText("Snow Leopard")
    ).not.toBeInTheDocument()
  })

  it("filters wildlife by conservation category and shows more wildlife", async () => {
    const user = userEvent.setup()

    render(<Wildlife />)

    const vulnerableButton = screen.getByRole(
      "button",
      {
        name: "Vulnerable",
      }
    )

    await user.click(vulnerableButton)

    expect(
      screen.getByText("African Elephant")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Snow Leopard")
    ).toBeInTheDocument()

    expect(
      screen.queryByText("Bengal Tiger")
    ).not.toBeInTheDocument()

    await user.click(
      screen.getByRole("button", {
        name: "All Wildlife",
      })
    )

    expect(
      screen.getByRole("button", {
        name: "View More Wildlife",
      })
    ).toBeInTheDocument()

    expect(
      screen.getAllByTestId("wildlife-card")
    ).toHaveLength(6)

    await user.click(
      screen.getByRole("button", {
        name: "View More Wildlife",
      })
    )

    expect(
      screen.getAllByTestId("wildlife-card")
    ).toHaveLength(7)

    expect(
      screen.getByRole("button", {
        name: "Show Less",
      })
    ).toBeInTheDocument()
  })
})