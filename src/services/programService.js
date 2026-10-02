import axios from "axios"

const PROGRAM_API_URL =
    "https://sheet2api.com/v1/4tx8IwsSWLhU/program"

export const fetchPrograms = async () => {
    const response = await axios.get(PROGRAM_API_URL)

    return response.data
}