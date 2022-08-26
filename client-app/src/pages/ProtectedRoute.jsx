import { useSelector } from 'react-redux' 
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
    const {user} = useSelector(store => store.user)

    if (user) {
        return children
    }

    return <Navigate to="/home" />
}