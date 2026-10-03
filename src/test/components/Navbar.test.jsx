import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"

import Navbar from "../../components/Navbar/Navbar"

function renderNavbar() {
    return render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    )
}

describe("Navbar", () => {
    it("renders the WildGuard brand", () => {
        renderNavbar()

//    ----Navbar----

        expect(screen.getByText("WildGuard")).toBeInTheDocument()
    })

    it("renders all main navigation links", () => {
        renderNavbar()

        expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: "Wildlife" })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: "Programs" })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: "Blog" })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: "Join Team" })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument()
    })

    it("renders the Join the Mission button", () => {
        renderNavbar()

        expect(
            screen.getByRole("link", { name: "Join the Mission" })
        ).toBeInTheDocument()
    })
})

    // ----Test the mobile menu----

it("opens and closes the mobile menu", async () => {
    const user = userEvent.setup()

    renderNavbar()

    const menuButton = screen.getByRole("button", {
        name: "Open navigation menu",
    })

    expect(menuButton).toBeInTheDocument()

    await user.click(menuButton)

    expect(
        screen.getByRole("button", {
            name: "Close navigation menu",
        })
    ).toBeInTheDocument()

    await user.click(
        screen.getByRole("button", {
            name: "Close navigation menu",
        })
    )

    expect(
        screen.getByRole("button", {
            name: "Open navigation menu",
        })
    ).toBeInTheDocument()
})