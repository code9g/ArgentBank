import { Link, NavLink } from "react-router-dom";
import logo from "../assets/img/argentBankLogo.png";

function Header() {
  const isLogged = true;
  const fullname = "Tony";

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <NavLink className="main-nav-item" to={isLogged ? "/user" : "/sign-in"}>
          <i className="fa fa-user-circle"></i>
          {isLogged ? fullname : "Sign In"}
        </NavLink>
        {isLogged && (
          <NavLink className="main-nav-item" to="/sign-out">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Header;
