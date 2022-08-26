import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Wrapper from '../assets/wrappers/RegisterPage'
import { Logo, MyInput } from '../components'
import { loginUser, registerUser } from '../features/user/userSlice'

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true
}

export default function Register() {
    const [values, setValues] = useState(initialState)
    const { user, isLoading } = useSelector(store => store.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }
    }, [user, navigate])

    const handleChange = (e) => {
        const [name, value] = [e.target.name, e.target.value]
        setValues({ ...values, [name]: value })
    }

    const onSumbit = (e) => {
        e.preventDefault()
        const {name, email, password, isMember} = values

        if (!email || !password || (!isMember && !name)) {
            toast.error('Please fill all the fields!')
            return
        }

        if (isMember) {
            dispatch(loginUser({email, password}))
            return
        }

        dispatch(registerUser({name, email, password}))
    }

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }

    return (
        <Wrapper className="full-page">
            <form onSubmit={onSumbit} className="form">
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {!values.isMember &&
                    <MyInput
                        type="text"
                        name="name"
                        value={values.name}
                        handleChange={handleChange}
                    />
                }
                <MyInput
                    type="email"
                    name="email"
                    value={values.email}
                    handleChange={handleChange}
                />
                <MyInput
                    type="password"
                    name="password"
                    value={values.password}
                    handleChange={handleChange}
                />
                <button type="submit" className="btn btn-block" disabled={isLoading}>Submit</button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                    <button type="button" className="member-btn" onClick={toggleMember}>
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    )
}