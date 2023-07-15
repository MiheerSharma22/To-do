import { configureStore } from "@reduxjs/toolkit";
import NumberOfTodos from "./slices/NumberOfTodos";

export const store = configureStore({
    reducer: {
        numberOfTodos: NumberOfTodos
    }
})