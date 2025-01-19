import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import z from "zod";
import {API} from "../../common/axios";
import {CreateAdvantageSchema, UpdateAdvantageSchema} from 'd100-libs'

export type Advantage = { id?: string } & z.infer<typeof CreateAdvantageSchema>

type CreatePayload = {
    data: Advantage,
}

type UpdatePayload = CreatePayload & { id: string }

export const loadAdvantages = createAsyncThunk(
    'advantages/load',
    async (_, {getState}) => {
        const current = getState() as AdvantagesState;
        try {
            const response = await API.get('advantage');
            return response;
        } catch (e) {
            console.error(e)
            return Promise.reject()
        }
    })

export const updateAdvantage = createAsyncThunk(
    'advantages/updateOne',
    async ({id, data}: UpdatePayload) => {
        try {
            const response = await API.post(`advantage/${id}`, data);
            return response;
        } catch (e) {
            console.error(e)
            return Promise.reject()
        }
    })

export const createAdvantage = createAsyncThunk(
    'advantages/create',
    async ({data}: CreatePayload) => {
        try {
            const response = await API.post(`advantage`, data);
            return response;
        } catch (e) {
            console.error(e)
            return Promise.reject()
        }
    })

export interface AdvantagesState {
    advantages: Advantage[],
    status: "loading" | "idle" | "failed" | "submitting";
}

const initialState: AdvantagesState = {
    advantages: [],
    status: 'idle'
}

const advantagesSlice = createSlice({
    name: 'advantage',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadAdvantages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadAdvantages.fulfilled, (state, action) => {
                return {
                    status: 'idle',
                    advantages: action.payload
                }
            })
            .addCase(loadAdvantages.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(updateAdvantage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateAdvantage.fulfilled, (state, action) => {
                const {id} = action.payload;
                const index = state.advantages.map(item => item.id).indexOf(id);
                state.advantages[index] = action.payload;
            })
            .addCase(updateAdvantage.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(createAdvantage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createAdvantage.fulfilled, (state, action) => {
                const loadThenAdd = async () => {
                    await loadAdvantages();
                    state.advantages.push(action.payload)
                }

                if (!state.advantages.length) {
                    loadThenAdd();
                } else {
                    state.advantages.push(action.payload)
                }

            })
            .addCase(createAdvantage.rejected, (state) => {
                state.status = 'failed';
            })
    },
    selectors: {
        allAdvantages: sliceState => sliceState.advantages,
        advantageById: (sliceState, id): Advantage | undefined => {
            return sliceState.advantages?.find(a => a.id === id)
        }
    }
})

export const {allAdvantages, advantageById} = advantagesSlice.selectors;

export default advantagesSlice.reducer;
