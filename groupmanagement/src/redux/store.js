import {createStore ,configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlices';
import groupSlice from './slices/groupSlices';
import msgSlice from './slices/MsgSlices';
import tagSlice from './slices/tags';
import reqSlice from './slices/reqSlices';

const reducer = combineReducers({
    auth: authSlice,
    group: groupSlice,
    msg: msgSlice,
    tag: tagSlice,
    req: reqSlice
});

const store = configureStore({
    reducer: reducer
});



export default store;