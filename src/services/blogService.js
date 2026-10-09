import axios from "axios"

const BLOG_API_URL =
  "https://script.google.com/macros/s/AKfycbzJq2pSBtJdeDDq6nCpOf3QN_NIcPweHOP3Xb5zjCtBLEBRAgcB5Kf-MmV18_DrG8L-/exec"

export const fetchBlogs = async () => {
  const response = await axios.get(BLOG_API_URL)

  return response.data
}