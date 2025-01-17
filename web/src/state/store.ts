import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import userReducer from "./user/slice";
import drawerReducer from "./drawer/slice";
import advantagesReducer from './advantages/slice';
import formReducer from "./form/slice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        drawer: drawerReducer,
        advantages: advantagesReducer,
        form: formReducer,
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
