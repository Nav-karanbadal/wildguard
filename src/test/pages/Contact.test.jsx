import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"

import Contact from "../../pages/Contact"

describe("Contact", () => {
  it("shows validation errors when the form is submitted empty", async () => {
    const user = userEvent.setup()

    render(<Contact />)

    await user.click(
      screen.getByRole("button", {
        name: /send message/i,
      })
    )

    expect(
      screen.getByText("Please enter your name.")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Please enter your email address.")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Please select a subject.")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Please enter your message.")
    ).toBeInTheDocument()
  })

  it("submits the contact form successfully with valid information", async () => {
    const user = userEvent.setup()

    const { container } = render(<Contact />)

    const nameInput = container.querySelector(
      'input[name="name"]'
    )

    const emailInput = container.querySelector(
      'input[name="email"]'
    )

    const subjectSelect = container.querySelector(
      'select[name="subject"]'
    )

    const messageInput = container.querySelector(
      'textarea[name="message"]'
    )

    await user.type(nameInput, "John Doe")

    await user.type(
      emailInput,
      "john@example.com"
    )

    await user.selectOptions(
      subjectSelect,
      "General Inquiry"
    )

    await user.type(
      messageInput,
      "I would like to learn more about WildGuard and its wildlife conservation programs."
    )

    await user.click(
      screen.getByRole("button", {
        name: /send message/i,
      })
    )

    expect(
      screen.getByText("Message Sent Successfully!")
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        /Thank you for contacting WildGuard India/
      )
    ).toBeInTheDocument()
  })
})