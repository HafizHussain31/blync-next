import { createSlice } from "@reduxjs/toolkit";
import request from "../../services";
import Exported from "../../services/endpoints";

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        data: []
    },
    reducers: {
        saveData: (state, action) =>{
            state.data = action.payload;
        },
    }
});

export const getDashboardData = (data) => {
    return new Promise((resolve, reject) => {
        request({
            url: Exported.Endpoints.GET_DASHBOARD,
            method: Exported.APIMethods.POST,
            data: data
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject([])
        })
    })
}

export const { saveData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
