import { configureStore, type ThunkAction, type UnknownAction } from "@reduxjs/toolkit";

import { sessionPersistence, sessionSlice } from "@/entities/user";
import { seatHoldSlice } from "@/features/hold-seats";
import { selectedSeatsSlice } from "@/features/select-seats";
import { baseApi } from "@/shared/api/base-api";

type State = {
  [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
  [sessionSlice.name]: ReturnType<typeof sessionSlice.reducer>;
  [selectedSeatsSlice.name]: ReturnType<typeof selectedSeatsSlice.reducer>;
  [seatHoldSlice.name]: ReturnType<typeof seatHoldSlice.reducer>;
};

// Hand-written instead of passing an object to configureStore: Redux's combineReducers
// calls Math.random() while creating the store, which Cache Components rejects during
// prerender. Add each new slice reducer here.
function rootReducer(state: State | undefined, action: UnknownAction): State {
  const next: State = {
    api: baseApi.reducer(state?.api, action),
    session: sessionSlice.reducer(state?.session, action),
    selectedSeats: selectedSeatsSlice.reducer(state?.selectedSeats, action),
    seatHold: seatHoldSlice.reducer(state?.seatHold, action),
  };

  const unchanged =
    state !== undefined &&
    (Object.keys(next) as (keyof State)[]).every((key) => next[key] === state[key]);

  return unchanged ? state : next;
}

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(sessionPersistence.middleware).concat(baseApi.middleware),
  });
}

type AppStore = ReturnType<typeof makeStore>;

declare global {
  type RootState = ReturnType<AppStore["getState"]>;
  type AppDispatch = AppStore["dispatch"];
  type AppThunk<TReturn = void> = ThunkAction<TReturn, RootState, unknown, UnknownAction>;
}
