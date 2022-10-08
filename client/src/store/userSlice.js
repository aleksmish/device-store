import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuth: false,
    user: {},
    basketDevices: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuth(state, action) {
            state.isAuth = action.payload
        },
        setUser(state, action) {
            state.user = action.payload
        },
        setBasketDevices(state, action) {
            state.basketDevices = action.payload
        },
        addBasketDevice(state, action){
            state.basketDevices.push(action.payload)
        }
    }
})


export const {setIsAuth,setUser,setBasketDevices,addBasketDevice} = userSlice.actions

export default userSlice.reducer