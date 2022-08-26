import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'
import { Link } from 'react-router-dom'

export default function Error() {
    return (
        <Wrapper className="full-page">
            <div>
                <img src={img} alt="Not Found" />
                <h3>Oops! Page Not Found</h3>
                <p>You can browse other pages that exist</p>
                <Link to="/">Back To Dashboard</Link>
            </div>
        </Wrapper>
    )
}