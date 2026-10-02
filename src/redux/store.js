import { configureStore } from "@reduxjs/toolkit"

import wildlifeReducer from "./wildlifeSlice"
import programReducer from "./programSlice"
import blogReducer from "./blogSlice"

const store = configureStore({
    reducer: {
        wildlife: wildlifeReducer,
        programs: programReducer,
        blogs: blogReducer,
    },
})

export default store