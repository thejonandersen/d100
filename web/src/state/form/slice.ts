import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import z from "zod";
import {API} from "../../common/axios";
import {getNestedPropByString} from '../../common/utils';
import _ from 'lodash';

export interface FormState {
    forms: {
        [key: string]: any
    };
    status: 'dirty' | 'submitting' | 'idle'
}

const initialState: FormState = {
    forms: {},
    status: 'idle',
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        registerForm: (state, action) => {
            const { id, data }: { id: string, data: any } = action.payload;

            state.forms[id] = data;
        },
        clearForm: (state, action) => {
            delete state.forms[action.payload.id]
        },
        clearAll: state => ({ ...state, forms: {} }),
        updateFormData: (state, action) => {
            const { data, path }: { id: string, data: any, path: string } = action.payload;
            _.set(state.forms, path, data);
        }
    },
    selectors: {
        isValid: (state, schema, id) => schema.safeParse(state.forms[id]),
        getValue: (state, path) => {
            return _.get(state.forms, path)
        },
        status: state => state.status,
    }
})

export const {isValid, getValue, status} = formSlice.selectors;
export const {registerForm, clearForm, updateFormData, clearAll} = formSlice.actions;

export default formSlice.reducer;
