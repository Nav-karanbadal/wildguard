import axios from "axios"

const PROGRAM_API_URL =
  "https://script.google.com/macros/s/AKfycbz49ktbcun8wfqbp0hY34K2QmhCZd3uW8wYUGjIoTi8WporAoxUc9466vPDKj_4ZmFApg/exec"

export const fetchPrograms = async () => {
  const response = await axios.get(PROGRAM_API_URL)

  return response.data
}
