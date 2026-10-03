import { render, screen, waitFor } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import {
  MemoryRouter,
  Routes,
  Route,
} from "react-router-dom"

import WildlifeDetails from "../../pages/WildlifeDetails"
import wildlifeReducer from "../../redux/wildlifeSlice"


const mockWildlife = [
  {
    ID: "1",
    "Animal Name": "Bengal Tiger",
    Species: "Panthera tigris",
    Habitat: "Forests and Grasslands",
    Diet: "Carnivore",
    "Conservation Status": "Endangered",
    "Average Lifespan (Years)": "15",
    "Weight (kg)": "220",
    "Height (cm)": "110",
    "Speed (km/h)": "60",
  },
]


function createTestStore({
  animals = mockWildlife,
  loading = false,
  error = null,
} = {}) {
  return configureStore({
    reducer: {
      wildlife: wildlifeReducer,
    },
    preloadedState: {
      wildlife: {
        animals,
        loading,
        error,
      },
    },
  })
}


function renderWildlifeDetails(
  id = "1",
  {
    animals = mockWildlife,
    loading = false,
    error = null,
  } = {}
) {
  const store = createTestStore({
    animals,
    loading,
    error,
  })

  return render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[`/wildlife/${id}`]}
      >
        <Routes>
          <Route
            path="/wildlife/:id"
            element={<WildlifeDetails />}
          />
        </Routes>
      </MemoryRouter>
    </Provider>
  )
}


describe("WildlifeDetails", () => {
  it("loads and displays wildlife details", async () => {
    renderWildlifeDetails("1")

    expect(
      await screen.findByRole("heading", {
        name: "Bengal Tiger",
        level: 1,
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText("Panthera tigris")
    ).toBeInTheDocument()

    expect(
      screen.getAllByText("Endangered").length
    ).toBeGreaterThan(0)
  })


  it("displays habitat and diet information", async () => {
    renderWildlifeDetails("1")

    expect(
      await screen.findByText("Bengal Tiger")
    ).toBeInTheDocument()

    expect(
      screen.getAllByText("Forests and Grasslands").length
    ).toBeGreaterThan(0)

    expect(
      screen.getByText("Carnivore")
    ).toBeInTheDocument()
  })


  it("displays additional wildlife information", async () => {
    renderWildlifeDetails("1")

    expect(
      await screen.findByText("15")
    ).toBeInTheDocument()

    expect(
      screen.getByText("220")
    ).toBeInTheDocument()

    expect(
      screen.getByText("110")
    ).toBeInTheDocument()

    expect(
      screen.getByText("60")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Average Lifespan")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Weight")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Height")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Speed")
    ).toBeInTheDocument()
  })


  it("shows an error when wildlife details cannot be loaded", async () => {
    renderWildlifeDetails("1", {
      animals: mockWildlife,
      loading: false,
      error: "Unable to load wildlife details",
    })

    expect(
      await screen.findByRole("heading", {
        name: "Unable to load wildlife details",
      })
    ).toBeInTheDocument()
  })


  it("shows an error when the requested wildlife does not exist", async () => {
    renderWildlifeDetails("999")

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: "Wildlife Not Found",
        })
      ).toBeInTheDocument()
    })

    expect(
      screen.getByText(
        "The requested wildlife species could not be found."
      )
    ).toBeInTheDocument()

    expect(
      screen.getByRole("link", {
        name: "Back to Wildlife",
      })
    ).toBeInTheDocument()
  })
})