import { configureStore } from "@reduxjs/toolkit";
import ShowModal from "./slices/ShowModal";

export const store = configureStore({
  reducer: {
    showModal: ShowModal,
  },
});
