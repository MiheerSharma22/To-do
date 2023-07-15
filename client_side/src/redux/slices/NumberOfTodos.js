import { createSlice } from "@reduxjs/toolkit";

const initialState = {value: 0}
export const NumberOfTodos = createSlice({
    name: "numberOfTodos",
    initialState,
    reducers: {
        todoAdded: (state) => {
            state.value += 1;
        },
        todoDeleted: (state) => {
            state.value -= 1;
        },
        updateByANumber: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {todoAdded, todoDeleted, updateByANumber} = NumberOfTodos.actions;
export default NumberOfTodos.reducer;