import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import z from "zod";
import {API} from "../../common/axios";
import {CreateLanguageSchema} from 'd100-libs'

export type Language = { id?: string } & z.infer<typeof CreateLanguageSchema>

export const load = createAsyncThunk(
    'languages/load',
    async (_, {getState}) => {
        const current = getState() as LanguagesState;
        try {
            const response = await API.get('language/?allRecords=true');
            return response;
        } catch (e) {
            console.error(e)
            return Promise.reject()
        }
    })

export interface LanguagesState {
    languages: Language[],
    status: 'idle' | 'loading' | 'failed'
}

const initialState: LanguagesState = {
    languages: [],
    status: 'idle',
}

const languagesSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        created: (state, action) => {
            state.languages.push(action.payload);
        },
        updated: (state, action) => {
            const index = state.languages.findIndex(language => language.id === action.payload.id);
            state.languages[index] = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(load.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(load.fulfilled, (state, action) => {
                return {
                    status: 'idle',
                    languages: action.payload
                }
            })
            .addCase(load.rejected, (state) => {
                state.status = 'failed';
            })
    },
    selectors: {
        all: sliceState => sliceState.languages,
        byId: (sliceState, id): Language | undefined => {
            return sliceState.languages?.find(a => a.id === id)
        }
    }
})

export const {created, updated} = languagesSlice.actions;

export const {all, byId} = languagesSlice.selectors;

export default languagesSlice.reducer;
