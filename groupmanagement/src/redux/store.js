import {createStore ,configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlices';
import groupSlice from './slices/groupSlices';
import msgSlice from './slices/MsgSlices';

const reducer = combineReducers({
    auth: authSlice,
    group: groupSlice,
    msg: msgSlice,

});

const store = configureStore({
    reducer: reducer
});



export default store;