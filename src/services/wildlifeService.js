import axios from "axios"

const WILDLIFE_API_URL =
    "https://sheet2api.com/v1/Pkri2luTchvM/wildlife"

export const fetchWildlife = async () => {
    const response = await axios.get(WILDLIFE_API_URL)

    return response.data
}