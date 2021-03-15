import {configureStore, combineReducers}  from '@reduxjs/toolkit';
import authSlice from './slices/authSlices';

const reducer = combineReducers({
    auth: authSlice
});

const store =  configureStore({
    reducer: reducer
});

export default store;