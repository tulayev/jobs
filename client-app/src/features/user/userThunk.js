import api from '../../utils/axios'
import { logoutUser } from './userSlice'

export const registerUserThunk = async (url, user, thunkApi) => {
    try {
        const { data } = await api.post(url, user) 
        return data
    } catch (error) {
        const {payload} = thunkApi.rejectWithValue(error)
        return thunkApi.rejectWithValue(payload.response.data) 
    }
}

export const loginUserThunk = async (url, user, thunkApi) => {
    try {
        const { data } = await api.post(url, user) 
        return data
    } catch (error) {
        const {payload} = thunkApi.rejectWithValue(error)
        return thunkApi.rejectWithValue(payload.response.data) 
    }
}

export const updateUserThunk = async (url, user, thunkApi) => {
    try {
        const { data } = await api.patch(url, user, {
            headers: {
                authorization: `Bearer ${thunkApi.getState().user.user.token}`
            }
        }) 
        return data
    } catch (error) {
        if (error.response.status === 401) {
            thunkApi.dispatch(logoutUser())
            return thunkApi.rejectWithValue('Unauthorized. Logging out...') 
        }
        const {payload} = thunkApi.rejectWithValue(error)
        return thunkApi.rejectWithValue(payload.response.data) 
    }
}