import {createSlice, Slice} from "@reduxjs/toolkit";
import z from "zod";

type DrawerState = {
    status: 'open' | 'closed',
}


const initialState: DrawerState = {
    status: 'closed',
};

const drawerSlice: Slice<DrawerState> = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        toggle: state => {
            state.status = state.status === 'open' ? 'closed' : 'open';
        }
    }
});

export const {toggle} = drawerSlice.actions;

export default drawerSlice.reducer

