import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utils/axios'
import { logoutUser } from '../user/userSlice'
import { getUserFromLocalStorage } from '../../utils/localStorage'
import { toast } from 'react-toastify'

const initialState = {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    editJobId: 0
}

export const createJob = createAsyncThunk(
    'job/createJob',
    async (job, thunkApi) => {
        try {
            const { data } = await api.post('/jobs', job, {
                headers: {
                    authorization: `Bearer ${thunkApi.getState().user.user.token}`
                }
            })
            thunkApi.dispatch(clearValues())
            return data
        } catch (error) {
            if (error.response.status === 401) {
                thunkApi.dispatch(logoutUser())
                return thunkApi.rejectWithValue('Unauthorized. Logging out...')
            }

            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        handleChange: (state, {payload: {name, value}}) => {
            state[name] = value
        },
        clearValues: () => { 
            return { ...initialState, jobLocation: getUserFromLocalStorage()?.location || '' } 
        }
    },
    extraReducers: {
        [createJob.pending]: state => {
            state.isLoading = true
        },
        [createJob.fulfilled]: state => {
            state.isLoading = false
            toast.success('Job created')
        },
        [createJob.rejected]: (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        }
    }
})

export const {handleChange, clearValues} = jobSlice.actions

export default jobSlice.reducer