import {createAsyncThunk, createSlice, createSelector} from "@reduxjs/toolkit";
import z from "zod";
import {API} from "../../common/axios";
import {CreateAdvantageSchema, UpdateAdvantageSchema} from 'd100-libs'

export type Advantage = {
    id?: string,
    special: any,
} & z.infer<typeof CreateAdvantageSchema>

const emptyArray: any[] = [];

export const load = createAsyncThunk(
    'advantages/load',
    async (_, {getState}) => {
        const current = getState() as AdvantagesState;
        if (current.status === 'loading')
            return;
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
    reducers: {
        created: (state, action) => {
            state.advantages.push(action.payload);
        },
        updated: (state, action) => {
            const index = state.advantages.findIndex(advantage => advantage.id === action.payload.id);
            state.advantages[index] = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(load.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(load.fulfilled, (state, action) => {
                state.status = 'idle';
                state.advantages = action.payload as unknown as Advantage[];
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
            return ids ? ids.map((id: string) => sliceState.advantages.find(a => a.id === id)): emptyArray
        }
    }
})

export const {created, updated} = advantagesSlice.actions;

export const {all, byId, byIds} = advantagesSlice.selectors;

export default advantagesSlice.reducer;
