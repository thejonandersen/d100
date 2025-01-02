import {createSlice, Slice} from "@reduxjs/toolkit";
import z from "zod";

type DrawerState = {
    open: boolean,
}


const initialState: DrawerState = {
    open: false,
};

const drawerSlice: Slice<DrawerState> = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        toggle: state => {
            state.open = !state.open;
        }
    }
});

export const {toggle} = drawerSlice.actions;

export default drawerSlice.reducer

