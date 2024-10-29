import { combineReducers } from "@reduxjs/toolkit";
import sidebarSlice from "./sidebarSlice";

const reducers = combineReducers({
    sidebar: sidebarSlice,
});

export default reducers;