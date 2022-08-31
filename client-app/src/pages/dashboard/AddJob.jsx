import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { MyInput, MySelect } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { clearValues, handleChange, createJob } from '../../features/job/jobSlice'
import { useEffect } from 'react'

export default function AddJob() {
    const {
        isLoading, 
        position, 
        company, 
        jobLocation, 
        jobType, 
        jobTypeOptions,
        status,
        statusOptions,
        isEditing
    } = useSelector(store => store.job)

    const {user} = useSelector(store => store.user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(handleChange({
            name: 'jobLocation',
            value: user.location
        }))
    }, [dispatch, user])

    const handleSubmit = e => {
        e.preventDefault()

        if (!position || !company || !jobLocation) {
            toast.error('Please fill out all the fields')
            return
        }

        dispatch(createJob({position, company, jobLocation, jobType, status}))
    }

    const handleInput = e => {
        const [name, value] = [e.target.name, e.target.value]
        dispatch(handleChange({name, value}))
    }

    return (
        <Wrapper>
            <form className="form">
                <h3>{isEditing ? 'edit job' : 'add job'}</h3>
                <div className="form-center">
                    <MyInput 
                        type="text"
                        name="position"
                        value={position}
                        handleChange={handleInput}
                    />
                    <MyInput 
                        type="text"
                        name="company"
                        value={company}
                        handleChange={handleInput}
                    />
                    <MyInput 
                        type="text"
                        name="jobLocation"
                        value={jobLocation}
                        handleChange={handleInput}
                        labelText="job location"
                    />
                    <MySelect
                        name="status"
                        value={status}
                        handleChange={handleInput}
                        list={statusOptions}
                    />
                    <MySelect
                        name="jobType"
                        value={jobType}
                        handleChange={handleInput}
                        list={jobTypeOptions}
                        labelText="Job type"
                    />
                    <div className="btn-container">
                        <button 
                            type="button" 
                            className="btn btn-block clear-btn"
                            onClick={() => dispatch(clearValues())}
                        >
                            Clear
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-block submit-btn"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}