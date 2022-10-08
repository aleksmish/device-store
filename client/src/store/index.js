import {combineReducers, configureStore} from '@reduxjs/toolkit'
import deviceSlice from './deviceSlice'
import userSlice from './userSlice'


const rootReducer = combineReducers({
    user: userSlice,
    device: deviceSlice
})


export const store = configureStore({
    reducer: rootReducer,
})
