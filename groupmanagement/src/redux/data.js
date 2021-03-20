import {createStore ,configureStore, combineReducers } from '@reduxjs/toolkit';
import groupSlice from './slices/groupSlices';

const initialState ={
    grouplist:[]
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'add_data':
            return {  ...state,
                grouplist: state.grouplist.concat({
                  key: Math.random(),
                  name: action.data
                })}
        case 'delete_data':
            return { foodList: state.foodList.filter((item) =>
                item.key !== action.key)}
    }
    return state
}

const store = createStore(reducer)


export default store;