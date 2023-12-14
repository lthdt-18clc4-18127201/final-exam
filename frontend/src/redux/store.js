import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice.js';

export const store = configureStore({
    reducer: {
        user: authReducer,
    },
})

export default store;