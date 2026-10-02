import axios from "axios"

const BLOG_API_URL =
  "https://sheet2api.com/v1/4tx8IwsSWLhU/blog"

export const fetchBlogs = async () => {
  const response = await axios.get(BLOG_API_URL)

  return response.data
}