import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

export const Header = () => {
    return (
        <header>
            <div className="navbar__wrapper">
                <div className="logo_wrapper">
                </div>
                <nav>
                    <ul className="navlinks__list">
                        <Link to="/movies" className="navlinks__item">
                            Movies Task
                            </Link>
                        <Link to="/products" className="navlinks__item">
                            Products Task
                            </Link>
                        <li className="navlinks__item">
                            Settings
                            </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
/**      // <img src={logo} alt={logo} className="logo__svg" />
 */