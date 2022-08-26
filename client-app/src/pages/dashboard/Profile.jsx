import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { MyInput } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { updateUser } from '../../features/user/userSlice'

export default function Profile() {
    const { isLoading, user } = useSelector(store => store.user)
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        lastName: user?.lastName || '',
        location: user?.location || ''
    })
    
    const handleSubmit = e => {
        e.preventDefault()
        const { name, email, lastName, location } = userData
        
        if (!name || !email || !lastName || ! location) {
            toast.error('Please fill all the fields!')
            return
        }

        dispatch(updateUser(userData))
    }

    const handleChange = e => {
        const [name, value] = [e.target.name, e.target.value]
        setUserData({ ...userData, [name]: value })
    }

    return (
        <Wrapper>
            <form className="form" onSubmit={handleSubmit}>
                <h3>Profile</h3>

                <div className="form-center">
                    <MyInput 
                        type="text" 
                        name="name" 
                        value={userData.name} 
                        handleChange={handleChange} 
                    />
                    <MyInput 
                        type="text" 
                        name="lastName" 
                        value={userData.lastName} 
                        handleChange={handleChange} 
                        labelText="Last Name"
                    />
                    <MyInput 
                        type="email" 
                        name="email" 
                        value={userData.email} 
                        handleChange={handleChange} 
                    />
                    <MyInput 
                        type="text" 
                        name="location" 
                        value={userData.location} 
                        handleChange={handleChange} 
                    />
                    <button 
                        type="submit"
                        className="btn btn-block"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Pleas wait...' : 'Save'}
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}