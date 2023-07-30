import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
// Get user from local Storage

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}
// Register
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = 
        (error.response && 
            error.response.data && 
            error.response.data.message) ||
        error.message || 
        error.toString()

        return thunkAPI.rejectWithValue(message)
        
    }
})

// Login

export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = 
        (error.response && 
            error.response.data && 
            error.response.data.message) ||
        error.message || 
        error.toString()

        return thunkAPI.rejectWithValue(message)
        
    }
})

export const logout = createAsyncThunk('auth/logout', async() => {
    await authService.logout()
})

const authSlice = createSlice({
    name: 'auht',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.message = ''
            state.isSuccess = false
        }
    },

    extraReducers: (builder) => {
        builder
          .addCase(register.pending, (state) => {
            state.isLoading = true
          })
          .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload
            state.isSuccess = true
          })  
          .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess= false
            state.isError = true
            state.message = action.payload
            state.user = null
          }) 
          .addCase(login.pending, (state) => {
            state.isLoading = true
          })
          .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload
            state.isSuccess = true
          })  
          .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess= false
            state.isError = true
            state.message = action.payload
            state.user = null
          })
          .addCase(logout.fulfilled, (state) => {
            state.user = null
          })   
    }

});




export const { reset } = authSlice.actions
export const authReducer = authSlice.reducer