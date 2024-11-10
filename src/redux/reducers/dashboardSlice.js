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

export const getDashboardData = () => async (dispatch) => {
    request({
        url: Exported.Endpoints.GET_DASHBOARD,
        method: Exported.APIMethods.POST
    }).then(res => {
        console.log(res);
        dispatch(saveData(res))
    }).catch(err => {
    })
}

export const { saveData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
