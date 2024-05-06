import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading:false,
    instances:[], 
};


const adminSlice = createSlice({
    name:"admin",
    initialState: initialState,
    reducers:{
        setLoading(state,value){
            state.loading = value.payload;
        },
        setInstances(state,value){
            state.instances = value.payload;
        }
    }
})

export const {setLoading,setInstances} = adminSlice.actions;
export default adminSlice.reducer;