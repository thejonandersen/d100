import {createAsyncThunk, createSlice, createSelector, current} from "@reduxjs/toolkit";
import {API} from "../../common/axios";
import _ from 'lodash';
import {RootState} from '../store'

export interface Form {
    [key: string]: any
}

export interface FormState {
    forms: Form;
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

const emptyKeys: string[] = [];

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
        getValue: (state, path: string) => createSelector(
            [
                state => {
                    const parts = path.split('.');
                    if (parts.length > 1) {
                        parts.pop()
                    }
                    return _.get(state.forms, parts.join('.'));
                }
            ],
            memo => {
                return _.get(memo, path.split('.').pop() as string) as any
            }
        )(state),
        status: state => state.status,
        mergedFormsData: createSelector(
            [
                state => state.forms,
                state => {
                    const keys = Object.keys(state.forms)
                    return keys.length ? keys : emptyKeys;
                },
            ],
            (forms: any, keys: string[]) => Object.keys(forms).reduce((pre: any, key: string) => {
                const splitKey = key.split('/');
                if (splitKey.length > 1) {
                    return {
                        ...pre,
                        [splitKey.pop() as string]: typeof forms[key] !== 'object' ? forms[key] : {
                            ...forms[key]
                        },
                    }
                }

                return {
                    ...pre,
                    ...forms[key],
                }

            }, {}),
        )
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

export const {status, mergedFormsData, getValue} = formSlice.selectors;
export const {registerForm, clearForm, updateFormData, clearAll} = formSlice.actions;

export default formSlice.reducer;
