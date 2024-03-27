import { configureStore } from "@reduxjs/toolkit";
import authnticationReducer from "./slice"

export const store = configureStore({
    reducer: authnticationReducer
})