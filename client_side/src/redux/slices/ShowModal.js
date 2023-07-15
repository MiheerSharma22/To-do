import { createSlice } from "@reduxjs/toolkit";

const initialState = { showModal: false };
export const ShowModal = createSlice({
  name: "showModal",
  initialState,
  reducers: {
    displayModal: (state) => {
      state.showModal = true;
    },
    hideModal: (state) => {
      state.showModal = false;
    },
  },
});

export const { displayModal, hideModal } = ShowModal.actions;
export default ShowModal.reducer;
