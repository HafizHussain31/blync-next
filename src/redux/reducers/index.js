import { combineReducers } from "@reduxjs/toolkit";
import sidebarSlice from "./sidebarSlice";
import replicationSlice from "./replicationSlice";
import { dashboardSlice } from "./dashboardSlice";

const reducers = combineReducers({
    sidebar: sidebarSlice,
    replication: replicationSlice,
    dashboard: dashboardSlice,
});

export default reducers;