import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import z from "zod";
import {API} from "../../common/axios";
import {CreateCharacterTemplateSchema} from 'd100-libs'

export type CharacterTemplate = { id?: string } & z.infer<typeof CreateCharacterTemplateSchema>

export const load = createAsyncThunk(
    'characterTemplates/load',
    async (_, {getState}) => {
        const current = getState() as CharacterTemplatesState;
        if (current.status === 'loading')
            return;
        try {
            const response = await API.get('character-template?allRecords=true');
            return response;
        } catch (e) {
            console.error(e)
            return Promise.reject()
        }
    })

export interface CharacterTemplatesState {
    characterTemplates: CharacterTemplate[],
    status: 'idle' | 'loading' | 'failed'
}

const initialState: CharacterTemplatesState = {
    characterTemplates: [],
    status: 'idle',
}

const characterTemplatesSlice = createSlice({
    name: 'characterTemplate',
    initialState,
    reducers: {
        created: (state, action) => {
            state.characterTemplates.push(action.payload);
        },
        updated: (state, action) => {
            const index = state.characterTemplates.findIndex(template => template.id === action.payload.id);
            state.characterTemplates[index] = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(load.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(load.fulfilled, (state, action) => {
                state.status = 'idle';
                state.characterTemplates = action.payload as unknown as CharacterTemplate[];
            })
            .addCase(load.rejected, (state) => {
                state.status = 'failed';
            })
    },
    selectors: {
        all: sliceState => sliceState.characterTemplates,
        byId: (sliceState, id): CharacterTemplate | undefined => {
            return sliceState.characterTemplates?.find(a => a.id === id)
        },
        byIds: (sliceState, ids) => {
            return ids ? ids.map((id: string) => sliceState.characterTemplates.find(a => a.id === id)):[]
        }
    }
})

export const {created, updated} = characterTemplatesSlice.actions;

export const {all, byId, byIds} = characterTemplatesSlice.selectors;

export default characterTemplatesSlice.reducer;
