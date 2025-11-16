import logo from "../../assets/logo.svg";
import { NavLink, Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
    return (
        <header className="header">
            <Link to="/" className="logo">
                <img src={logo} alt="Recipe App Logo" className="logo_img" />
                <h1 className="logo_title">Recipify</h1>
            </Link>
            <nav className="nav_bar">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "nav_item active" : "nav_item"
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/catalog"
                    className={({ isActive }) =>
                        isActive ? "nav_item active" : "nav_item"
                    }
                >
                    Catalog
                </NavLink>
                <NavLink
                    to="/favorites"
                    className={({ isActive }) =>
                        isActive ? "nav_item active" : "nav_item"
                    }
                >
                    Favorites
                </NavLink>
            </nav>
        </header>
    );
}
