import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"

import JoinTeam from "../../pages/JoinTeam"

describe("JoinTeam", () => {
  it("shows validation errors when the form is submitted empty", async () => {
    const user = userEvent.setup()

    render(<JoinTeam />)

    await user.click(
      screen.getByRole("button", {
        name: "Submit Volunteer Application",
      })
    )

    expect(
      screen.getByText("Please enter your full name.")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Please enter your email address.")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Please enter your phone number.")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Please select your state.")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Please select your city.")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Please select your area of interest.")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Please tell us why you want to join.")
    ).toBeInTheDocument()
  })

  it("submits the form successfully with valid information", async () => {
    const user = userEvent.setup()

    render(<JoinTeam />)

    await user.type(
      screen.getByLabelText(/Full Name/),
      "John Doe"
    )

    await user.type(
      screen.getByLabelText(/Email Address/),
      "john@example.com"
    )

    await user.type(
      screen.getByLabelText(/Phone Number/),
      "9876543210"
    )

    await user.selectOptions(
      screen.getByLabelText(/^State/),
      "Punjab"
    )

    await user.selectOptions(
      screen.getByLabelText(/^City/),
      "Amritsar"
    )

    await user.selectOptions(
      screen.getByLabelText(/Area of Interest/),
      "Wildlife Conservation"
    )

    await user.type(
      screen.getByLabelText(/Why do you want to join us/),
      "I want to contribute to wildlife conservation and protect natural habitats."
    )

    await user.click(
      screen.getByRole("button", {
        name: "Submit Volunteer Application",
      })
    )

    expect(
      screen.getByText("Application Submitted!")
    ).toBeInTheDocument()

    expect(
      screen.getByText(/Thank you for joining WildGuard India/)
    ).toBeInTheDocument()
  })
})