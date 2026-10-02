import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchPrograms } from "../services/programService"

export const getPrograms = createAsyncThunk(
    "programs/getPrograms",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchPrograms()
            return data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch programs data."
            )
        }
    }
)

const initialState = {
    programs: [],
    loading: false,
    error: null,
}

const programSlice = createSlice({
    name: "programs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPrograms.pending, (state) => {
                state.loading = true
                state.error = null
            })

            .addCase(getPrograms.fulfilled, (state, action) => {
                state.loading = false
                state.programs = action.payload
            })

            .addCase(getPrograms.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default programSlice.reducer