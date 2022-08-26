import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        Job <span>tracking</span> app
                    </h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ipsum eos voluptatibus placeat laborum? Natus, quibusdam animi? Ad amet illo doloremque sunt aliquam officia obcaecati nobis ipsa atque nostrum? Molestias.
                    </p>
                    <Link to="/register" className="btn btn-hero">Login/Register</Link>
                </div>
                <img src={main} alt="Job hunt" className="img main-img" />
            </div>
        </Wrapper>
    )
}