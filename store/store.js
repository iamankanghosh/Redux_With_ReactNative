import { configureStore } from "@reduxjs/toolkit";
import colorSlice from "./colorSlice";
import dataReducer  from './fetchApiSice'; // Import the fetchData async thunk action

export const store = configureStore({
  reducer: {
    color: colorSlice,
    data: dataReducer 
  },
});