import { NavLink } from "react-router-dom";
import './NavBar.css';

export default function NavBar({t, favorites}) {
  return (
    <nav>
      <NavLink
        className={({ isActive }) => (isActive ? "home-active-link" : "home")}
        to="/">
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "favorites-active-link" : "favorites"
        }
        to="/favorites">
        {t("favorites")} ({favorites.length})
      </NavLink>
    </nav>
  );
}
