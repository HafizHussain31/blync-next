import { createSlice } from "@reduxjs/toolkit";
import request from "../../services";
import Exported from "../../services/endpoints";

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        isCollapsed: false,
    },
    reducers: {
        saveIsCollapsed: (state, action) =>{
            state.isCollapsed = action.payload;
        },
    }
});

export const { saveIsCollapsed } = sidebarSlice.actions;

export default sidebarSlice.reducer;
