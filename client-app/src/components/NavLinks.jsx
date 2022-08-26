import links from '../utils/links'
import { NavLink } from 'react-router-dom'

export default function NavLinks({ toggleSidebar }) {
    return (
        <div className="nav-links">
            {links.map(({ id, text, path, icon }) => {
                return (
                    <NavLink 
                        to={path} 
                        className={({isActive}) => {
                            return isActive ? 'nav-link active' : 'nav-link'
                        }}
                        key={id}
                        onClick={toggleSidebar}
                    >
                        <span className="icon">{icon}</span>
                        {text}
                    </NavLink>
                )
            })}
        </div>
    )
}