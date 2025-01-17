import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import userReducer from "./user/slice";
import drawerReducer from "./drawer/slice";
import advantagesReducer from './advantages/slice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        drawer: drawerReducer,
        advantages: advantagesReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
