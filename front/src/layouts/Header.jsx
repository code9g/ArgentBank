import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/img/argentBankLogo.png";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useAuthSelector } from "../redux/hooks";
import { signOutThunk } from "../redux/thunk";
import { promiseError } from "../utils/consts";

function Header() {
  const { isAuth, firstName } = useAuthSelector();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();

    try {
      await toast.promise(dispatch(signOutThunk()).unwrap(), {
        pending: "Disconnecting...",
        success: "You are logged out",
        error: promiseError,
      });
      navigate("/");
    } catch (error) {
      // No report error
    }
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
            <Link className="main-nav-item" to="/sign-out" onClick={logout}>
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
