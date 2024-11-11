import { createSlice } from "@reduxjs/toolkit";
import request from "../../services";
import Exported from "../../services/endpoints";

export const replicationSlice = createSlice({
    name: "replication",
    initialState: {
        data: []
    },
    reducers: {
        saveData: (state, action) =>{
            state.data = action.payload;
        },
    }
});

export const getReplicationData = () => async (dispatch) => {
    request({
        url: Exported.Endpoints.GET_REPLICATIONS,
        method: Exported.APIMethods.POST
    }).then(res => {
        console.log(res);
        
        dispatch(saveData(res))
    }).catch(err => {
    })
}

export const getSourceTables = (data) => {
    return new Promise((resolve, _reject) => {
        request({
            url: Exported.Endpoints.GET_SOURCE_TABLES,
            method: Exported.APIMethods.POST,
            data
        }).then(res =>{
            resolve(res)
        }).catch(err=> {
            resolve([])
        })
    })

}

export const { saveData } = replicationSlice.actions;

export default replicationSlice.reducer;
