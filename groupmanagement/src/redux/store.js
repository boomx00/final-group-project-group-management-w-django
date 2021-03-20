import {createStore ,configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlices';
import groupSlice from './slices/groupSlices';

const reducer = combineReducers({
    auth: authSlice,
    group: groupSlice,

});

const store = configureStore({
    reducer: reducer
});



export default store;