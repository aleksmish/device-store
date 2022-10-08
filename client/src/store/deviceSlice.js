import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    types: [],
    brands: [],
    devices: [],
    selectedType: null,
    selectedBrand: null,
    page:1,
    totalCount: 0,
    limit: 9
}

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setTypes(state,action){
            state.types=action.payload
        },
        setBrands(state,action){
            state.brands=action.payload
        },
        setDevices(state,action){
            state.devices=action.payload
        },
        setSelectedType(state,action){
            state.page = 1
            state.selectedType = action.payload
        },
        setSelectedBrand(state,action){
            state.page = 1
            state.selectedBrand = action.payload
        },
        setPage(state,action){
            state.page = action.payload
        },
        setTotalCount(state,action){
            state.totalCount = action.payload
        }
    }
})


export const {setTypes, setBrands, setDevices, setSelectedType, setSelectedBrand, setPage, setTotalCount} = deviceSlice.actions

export default deviceSlice.reducer