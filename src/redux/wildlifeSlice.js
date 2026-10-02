import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchWildlife } from "../services/wildlifeService"

export const getWildlife = createAsyncThunk(
    "wildlife/getWildlife",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchWildlife()
            return data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch wildlife data."
            )
        }
    }
)

const initialState = {
    animals: [],
    loading: false,
    error: null,
}

const wildlifeSlice = createSlice({
    name: "wildlife",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getWildlife.pending, (state) => {
                state.loading = true
                state.error = null
            })

            .addCase(getWildlife.fulfilled, (state, action) => {
                state.loading = false
                state.animals = action.payload
            })

            .addCase(getWildlife.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default wildlifeSlice.reducer