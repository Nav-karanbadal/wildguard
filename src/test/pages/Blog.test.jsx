import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi, beforeEach } from "vitest"

import Blog from "../../pages/Blog"

const mockDispatch = vi.fn()

const mockBlogs = [
  {
    ID: "1",
    "Blog Title": "Wildlife Conservation in India",
    Description:
      "Learn about wildlife conservation and protecting natural habitats.",
    "Focus Area": "Conservation",
    "Author/Organization": "WildGuard India",
    "Last Updated": "2026-01-01",
    "Website URL": "",
    "Social Media Links": "",
  },
  {
    ID: "2",
    "Blog Title": "Protecting Endangered Species",
    Description:
      "Understanding the importance of protecting endangered wildlife.",
    "Focus Area": "Endangered Species",
    "Author/Organization": "WildGuard India",
    "Last Updated": "2026-01-02",
    "Website URL": "",
    "Social Media Links": "",
  },
  {
    ID: "3",
    "Blog Title": "Climate and Wildlife",
    Description:
      "How climate change affects wildlife and ecosystems.",
    "Focus Area": "Climate",
    "Author/Organization": "WildGuard India",
    "Last Updated": "2026-01-03",
    "Website URL": "",
    "Social Media Links": "",
  },
  {
    ID: "4",
    "Blog Title": "Habitat Restoration",
    Description:
      "Restoring habitats to support biodiversity.",
    "Focus Area": "Habitat",
    "Author/Organization": "WildGuard India",
    "Last Updated": "2026-01-04",
    "Website URL": "",
    "Social Media Links": "",
  },
  {
    ID: "5",
    "Blog Title": "Wildlife Research",
    Description:
      "The role of research in modern conservation.",
    "Focus Area": "Research",
    "Author/Organization": "WildGuard India",
    "Last Updated": "2026-01-05",
    "Website URL": "",
    "Social Media Links": "",
  },
]

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,

  useSelector: (selector) =>
    selector({
      blogs: {
        blogs: mockBlogs,
        loading: false,
        error: null,
      },
    }),
}))

vi.mock("../../redux/blogSlice", () => ({
  getBlogs: vi.fn(() => ({
    type: "blogs/getBlogs",
  })),
}))

vi.mock("../../components/BlogCard/BlogCard", () => ({
  default: ({ blog }) => (
    <div data-testid="blog-card">
      <h3>{blog.title}</h3>
      <p>{blog.category}</p>
      <p>{blog.description}</p>
    </div>
  ),
}))

describe("Blog", () => {
  beforeEach(() => {
    mockDispatch.mockClear()
  })

  it("renders the Blog page", () => {
    render(<Blog />)

    expect(
      screen.getByText("Stories That")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Inspire Action")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Discover wildlife stories, conservation insights and inspiring ideas that help us understand and protect the natural world.")
    ).toBeInTheDocument()
  })

  it("displays blog articles", () => {
    render(<Blog />)

    expect(
      screen.getByText("Wildlife Conservation in India")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Protecting Endangered Species")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Climate and Wildlife")
    ).toBeInTheDocument()
  })

  it("filters blogs by category", async () => {
    const user = userEvent.setup()

    render(<Blog />)

    await user.click(
      screen.getByRole("button", {
        name: "Wildlife Protection",
      })
    )

    expect(
      screen.getByText("Protecting Endangered Species")
    ).toBeInTheDocument()

    expect(
      screen.queryByText("Wildlife Conservation in India")
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText("Climate and Wildlife")
    ).not.toBeInTheDocument()
  })

  it("filters blogs by search text", async () => {
    const user = userEvent.setup()

    render(<Blog />)

    const searchInput = screen.getByLabelText("Search Stories")

    await user.type(searchInput, "Climate")

    expect(
      screen.getByText("Climate and Wildlife")
    ).toBeInTheDocument()

    expect(
      screen.queryByText("Wildlife Conservation in India")
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText("Protecting Endangered Species")
    ).not.toBeInTheDocument()
  })

  it("shows all stories when All Stories is selected", async () => {
    const user = userEvent.setup()

    render(<Blog />)

    await user.click(
      screen.getByRole("button", {
        name: "Wildlife Protection",
      })
    )

    expect(
      screen.queryByText("Wildlife Conservation in India")
    ).not.toBeInTheDocument()

    await user.click(
      screen.getByRole("button", {
        name: "All Stories",
      })
    )

    expect(
      screen.getByText("Wildlife Conservation in India")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Protecting Endangered Species")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Climate and Wildlife")
    ).toBeInTheDocument()
  })
})