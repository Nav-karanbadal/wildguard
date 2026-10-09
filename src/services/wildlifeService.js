import axios from "axios"

const WILDLIFE_API_URL =
  "https://script.google.com/macros/s/AKfycbwXurhnlp_v5vLzXiV8J9dET2NDZ8ujwqjTskCzaainaZKj4CJ7uOMBHr4qYIww489p/exec"

export const fetchWildlife = async () => {
  const response = await axios.get(WILDLIFE_API_URL)

  return response.data
}
