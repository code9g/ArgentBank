import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/img/argentBankLogo.png";

import { toast } from "react-toastify";
import { useAuthSelector } from "../redux/hooks";
import { useLogoutMutation } from "../redux/services/bankApi";

function Header() {
  const { isAuth, user } = useAuthSelector();
  const [logout] = useLogoutMutation();

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    toast
      .promise(logout().unwrap(), {
        pending: "Disconnecting...",
        success: "You are logged out",
        error: {
          render: ({ data: error }) => error.message,
        },
      })
      .then(() => navigate("/"));
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
              {user?.firstName || "Compte"}
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
