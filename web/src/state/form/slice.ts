import {createAsyncThunk, createSlice, createSelector, current} from "@reduxjs/toolkit";
import {API} from "../../common/axios";
import _ from 'lodash';
import {RootState} from '../store'

export interface FormState {
    forms: {
        [key: string]: any
    };
    status: 'dirty' | 'submitting' | 'idle' | 'failed';
}

const initialState: FormState = {
    forms: {},
    status: 'idle'
}

type SubmitFormPayload = {
    keys?: string[];
    url: string;
    id?: string;
    data?: any;
}

export const submitForm = createAsyncThunk(
    "form/submit",
    async ({url, id, data, keys = []}: SubmitFormPayload, {getState}) => {
        const state: RootState = getState() as RootState;
        const path = `${url}${id ? `/${id}`:''}`;
        let submitData: any = data ? data : keys.reduce((pre, cur) => ({...pre, ...state.form.forms[cur]}), {});
        if (submitData.id) {
            delete submitData.id;
        }

        try {
            const response: any = await API.post(path, submitData);
            console.log({response});
            return response;
        } catch (e: any) {
            console.error(e);
            return Promise.reject()
        }
    });

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        registerForm: (state, action) => {
            const {id, data}: { id: string, data: any } = action.payload;

            state.forms[id] = data;
        },
        clearForm: (state, action) => {
            delete state.forms[action.payload.id]
            state.status = 'idle'
        },
        clearAll: state => ({...state, forms: {}, status: 'idle'}),
        updateFormData: (state, action) => {
            const {data, path}: { id: string, data: any, path: string } = action.payload;
            if (!_.isEqual(_.get(state.forms, path), data)) {
                _.set(state.forms, path, data);
                state.status = 'dirty';
            }
        }
    },
    selectors: {
        isValid: (state, schema, id) => schema.safeParse(state.forms[id]),
        status: state => state.status,
        mergedFormsData: state => Object.keys(state.forms).reduce((pre: any, key: string) => {
            console.log(key, typeof state.forms[key])
            const splitKey = key.split('/');
            if (splitKey.length > 1) {
                return {
                    ...pre,
                    [splitKey.pop() as string]: typeof state.forms[key] !== 'object' ? state.forms[key] : {
                        ...state.forms[key]
                    },
                }
            }

            return {
                ...pre,
                ...state.forms[key],
            }

        }, {}),
    },
    extraReducers: builder => {
        builder
            .addCase(submitForm.pending, (state) => {
                state.status = 'submitting'
            })
            .addCase(submitForm.fulfilled, (state) => {
                state.status = 'idle'
                state.forms = {}
            })
            .addCase(submitForm.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export const getValue = (state: RootState, path: string) => createSelector(
    [
        state => {
            const parts = path.split('.');
            if (parts.length > 1) {
                parts.pop()
            }
            return _.get(state.form.forms, parts.join('.'));
        }
    ],
    memo => {
        return _.get(memo, path.split('.').pop() as string) as any
    }
)(state)

export const {isValid, status, mergedFormsData} = formSlice.selectors;
export const {registerForm, clearForm, updateFormData, clearAll} = formSlice.actions;

export default formSlice.reducer;
