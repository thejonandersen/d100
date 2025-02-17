import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import z from "zod";
import {API} from "../../common/axios";
import {CreatePowerSchema} from 'd100-libs'

export type Power = { id?: string } & z.infer<typeof CreatePowerSchema>

export const load = createAsyncThunk(
    'powers/load',
    async (_, {getState}) => {
        const current = getState() as PowersState;
        if (current.status === 'loading')
            return;
        try {
            const response = await API.get('power?allRecords=true');
            return response;
        } catch (e) {
            console.error(e)
            return Promise.reject()
        }
    })

export interface PowersState {
    powers: Power[],
    status: 'idle' | 'loading' | 'failed'
}

const initialState: PowersState = {
    powers: [],
    status: 'idle',
}

const powersSlice = createSlice({
    name: 'power',
    initialState,
    reducers: {
        created: (state, action) => {
            state.powers.push(action.payload);
        },
        updated: (state, action) => {
            const index = state.powers.findIndex(power => power.id === action.payload.id);
            state.powers[index] = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(load.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(load.fulfilled, (state, action) => {
                state.status = 'idle';
                state.powers = action.payload as unknown as Power[];
            })
            .addCase(load.rejected, (state) => {
                state.status = 'failed';
            })
    },
    selectors: {
        all: sliceState => sliceState.powers,
        byId: (sliceState, id): Power | undefined => {
            return sliceState.powers?.find(a => a.id === id)
        },
        byIds: (sliceState, ids) => {
            return ids ? ids.map((id: string) => sliceState.powers.find(a => a.id === id)):[]
        }
    }
})

export const {created, updated} = powersSlice.actions;

export const {all, byId, byIds} = powersSlice.selectors;

export default powersSlice.reducer;
