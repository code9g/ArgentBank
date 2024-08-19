import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/img/argentBankLogo.png";
import { signOut } from "../redux/slices/loginSlice";
import { clear } from "../redux/slices/profileSlice";

function Header() {
  const { token } = useSelector((state) => state.login);
  const { firstName } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

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
        <NavLink className="main-nav-item" to={token ? "/user" : "/sign-in"}>
          <i className="fa fa-user-circle"></i>
          {token ? firstName : "Sign In"}
        </NavLink>
        {token && (
          <Link
            className="main-nav-item"
            to="/sign-out"
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: signOut });
              dispatch({ type: clear });
            }}
          >
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
