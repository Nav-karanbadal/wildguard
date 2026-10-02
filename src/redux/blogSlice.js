import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchBlogs } from "../services/blogService"

export const getBlogs = createAsyncThunk(
    "blogs/getBlogs",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchBlogs()

            return data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch blog data."
            )
        }
    }
)

const initialState = {
    blogs: [],
    loading: false,
    error: null,
}

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.pending, (state) => {
                state.loading = true
                state.error = null
            })

            .addCase(getBlogs.fulfilled, (state, action) => {
                state.loading = false
                state.blogs = action.payload
            })

            .addCase(getBlogs.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default blogSlice.reducer