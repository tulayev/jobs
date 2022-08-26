import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../../utils/localStorage'
import { loginUserThunk, registerUserThunk, updateUserThunk } from './userThunk'

const initialState = {
    isLoading: false,
    isSidebarOpen: false,
    user: getUserFromLocalStorage()
}

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user, thunkApi) => {
        return registerUserThunk('/auth/register', user, thunkApi)
    }
)

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user, thunkApi) => {
        return loginUserThunk('/auth/login', user, thunkApi)
    }
)

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (user, thunkApi) => {
        return updateUserThunk('/auth/updateUser', user, thunkApi)
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleSidebar: state => {
            state.isSidebarOpen = !state.isSidebarOpen
        },
        logoutUser: state => {
            state.isSidebarOpen = false
            state.user = null
            removeUserFromLocalStorage()
        }
    },
    extraReducers: {
        [registerUser.pending]: state => {
            state.isLoading = true
        },
        [registerUser.fulfilled]: (state, {payload}) => {
            const {user} = payload
            state.isLoading = false 
            state.user = user
            addUserToLocalStorage(user)
            toast.success(`Hello there ${user.name}`)
        },
        [registerUser.rejected]: (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        },
        [loginUser.pending]: state => {
            state.isLoading = true
        },
        [loginUser.fulfilled]: (state, {payload}) => {
            const {user} = payload
            state.isLoading = false 
            state.user = user
            addUserToLocalStorage(user) 
            toast.success(`Welcome, ${user.name}`)
        },
        [loginUser.rejected]: (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        },
        [updateUser.pending]: state => {
            state.isLoading = true
        },
        [updateUser.fulfilled]: (state, {payload}) => {
            const {user} = payload
            state.isLoading = false 
            state.user = user
            addUserToLocalStorage(user) 
            toast.success('User updated successfully!')
        },
        [updateUser.rejected]: (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        }
    }
})

export const { toggleSidebar, logoutUser } = userSlice.actions

export default userSlice.reducer