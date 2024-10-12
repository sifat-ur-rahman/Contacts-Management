import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {}

// Define the initial state using that type
const initialState: IInitialState = {};

export const contactSlice = createSlice({
  name: "contact",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setContact: () => {},
  },
});

export const { setContact } = contactSlice.actions;

export default contactSlice.reducer;
