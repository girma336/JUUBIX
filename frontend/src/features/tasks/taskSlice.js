import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";

const initialState = {
    tasks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createTask = createAsyncThunk('tasks/create', async(task, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await taskService.createTask(task, token)
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

// Get all task
export const getTasks = createAsyncThunk('tasks/getAll', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        console.log(token)
        return await taskService.getTasks(token)
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

export const deleteTask = createAsyncThunk('tasks/delete', async(id, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token
      return await taskService.deleteTask(id, token)
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

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.message = ''
            state.isSuccess = false
            state.tasks = []
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(createTask.pending, (state) => {
            state.isLoading = true
          })
          .addCase(createTask.fulfilled, (state, action) => {
            state.isLoading = false
            state.tasks.push(action.payload)
            state.isSuccess = true
          })  
          .addCase(createTask.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess= false
            state.isError = true
            state.message = action.payload
          })
          .addCase(getTasks.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getTasks.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.tasks = action.payload
            console.log("girma", action.payload)
          })  
          .addCase(getTasks.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess= false
            state.isError = true
            state.message = action.payload
          }) 
          .addCase(deleteTask.pending, (state) => {
            state.isLoading = true
          })
          .addCase(deleteTask.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.tasks = state.tasks.filter(task => task._id !== action.payload.id)
            console.log(state.tasks)
          })  
          .addCase(deleteTask.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess= false
            state.isError = true
            state.message = action.payload
          })
        }
})

export const { reset } = taskSlice.actions
export const taskReducer = taskSlice.reducer