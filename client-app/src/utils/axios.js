import axios from 'axios'

const api = axios.create({
    baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit'
})

export default api