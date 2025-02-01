import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import z from "zod";
import {API} from "../../common/axios";
import {CreateRaceSchema} from 'd100-libs'

export type Race = { id?: string } & z.infer<typeof CreateRaceSchema>

export const load = createAsyncThunk(
    'races/load',
    async (_, {getState}) => {
        const current = getState() as RacesState;
        try {
            const response = await API.get('race?allRecords=true');
            return response;
        } catch (e) {
            console.error(e)
            return Promise.reject()
        }
    })

export interface RacesState {
    races: Race[],
    status: "loading" | "idle" | "failed" | "submitting";
}

const initialState: RacesState = {
    races: [],
    status: 'idle'
}

const racesSlice = createSlice({
    name: 'race',
    initialState,
    reducers: {
        created: (state, action) => {
            state.races.push(action.payload);
        },
        updated: (state, action) => {
            const index = state.races.findIndex(race => race.id === action.payload.id);
            state.races[index] = action.payload;
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
                    races: action.payload
                }
            })
            .addCase(load.rejected, (state) => {
                state.status = 'failed';
            })
    },
    selectors: {
        all: sliceState => sliceState.races,
        byId: (sliceState, id): Race | undefined => {
            return sliceState.races?.find(a => a.id === id)
        }
    }
})

export const {created, updated} = racesSlice.actions;

export const {all, byId} = racesSlice.selectors;

export default racesSlice.reducer;
