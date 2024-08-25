import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/img/argentBankLogo.png";

import { useDispatch } from "react-redux";
import { useAuthSelector } from "../redux/hooks";
import { logout } from "../redux/slices/authSlice";

function Header() {
  const { isAuth, user } = useAuthSelector();
  const firstName = user?.firstName ?? null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

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
        {isAuth ? (
          <>
            <NavLink className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {firstName || "Compte"}
            </NavLink>
            <Link
              className="main-nav-item"
              to="/sign-out"
              onClick={handleLogout}
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          <NavLink className="main-nav-item" to={isAuth ? "/user" : "/sign-in"}>
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Header;
