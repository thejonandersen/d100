import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import z from "zod";
import {API} from "../../common/axios";
import {CreateAdvantageSchema, UpdateAdvantageSchema} from 'd100-libs'

export type Advantage = { id?: string } & z.infer<typeof CreateAdvantageSchema>

export const load = createAsyncThunk(
    'advantages/load',
    async (_, {getState}) => {
        const current = getState() as AdvantagesState;
        try {
            const response = await API.get('advantage?allRecords=true');
            return response;
        } catch (e) {
            console.error(e)
            return Promise.reject()
        }
    })

export interface AdvantagesState {
    advantages: Advantage[],
    status: 'idle' | 'loading' | 'failed'
}

const initialState: AdvantagesState = {
    advantages: [],
    status: 'idle',
}

const advantagesSlice = createSlice({
    name: 'advantage',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(load.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(load.fulfilled, (state, action) => {
                return {
                    status: 'idle',
                    advantages: action.payload
                }
            })
            .addCase(load.rejected, (state) => {
                state.status = 'failed';
            })
    },
    selectors: {
        all: sliceState => sliceState.advantages,
        byId: (sliceState, id): Advantage | undefined => {
            return sliceState.advantages?.find(a => a.id === id)
        },
        byIds: (sliceState, ids) => {
            return ids ? ids.map((id: string) => sliceState.advantages.find(a => a.id === id)):[]
        }
    }
})

export const {all, byId, byIds} = advantagesSlice.selectors;

export default advantagesSlice.reducer;
