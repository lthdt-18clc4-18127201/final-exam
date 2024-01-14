import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: '',
    token: '',
    loading: false
};

export const loginUser = createAsyncThunk(
    'user/login',
    async (body) => {
        const res = await fetch('http://localhost:8080/api/auth/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        return res.json();
    }
);

export const registerUser = createAsyncThunk(
    'user/register',
    async (body) => {
        const res = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        return res.json()
    }
)

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state) => {
            state.user = localStorage.getItem('user');
        },
        addToken: (state) => {
            state.token = localStorage.getItem('token');
        },
        logout: (state) => {
            state.user = '';
            state.token = '';
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, {payload: {user, accessToken}}) => {
            state.loading = false;
            state.user = user;
            state.token = accessToken;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', JSON.stringify(accessToken));
        })
        .addCase(loginUser.rejected, (state) => {
            state.loading = true;
        })
    }
})

export const { addUser, addToken, logout } = authSlice.actions;
export default authSlice.reducer;