import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import userReducer from "./user/slice";
import drawerReducer from "./drawer/slice";
import advantagesReducer from './advantage/slice';
import formReducer from "./form/slice";
import raceReducer from "./race/slice";
import languageReducer from "./language/slice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        drawer: drawerReducer,
        advantage: advantagesReducer,
        form: formReducer,
        race: raceReducer,
        language: languageReducer,
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
