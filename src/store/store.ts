import * as rp from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { sessionService } from 'redux-react-session';
import { configureStore, ThunkAction, Action, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';

import { authenticationReducer as authReducer } from './auth/authenticationReducer';

const middlewares = [
    createStateSyncMiddleware(),
];

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [rp.FLUSH, rp.REHYDRATE, rp.PAUSE, rp.PERSIST, rp.PURGE, rp.REGISTER],
        },
      }), ...middlewares],
});


initStateWithPrevTab(store);
sessionService.initSessionService(store);

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;