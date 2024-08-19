import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../redux/actions";
import { FETCHING_STATUS, SUCCESS_STATUS } from "../redux/slices/loginSlice";
import State from "./State";

function UserHeader() {
  const [isEditing, setIsEditing] = useState(false);

  const {
    status,
    error,
    user: { firstName, lastName },
  } = useSelector((state) => state.profile);

  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();

    dispatch(
      userUpdate(token, {
        firstName: e.target["firstName"].value,
        lastName: e.target["lastName"].value,
      })
    );
  };

  useEffect(() => {
    if (status === SUCCESS_STATUS) {
      setIsEditing(false);
    }
  }, [status]);

  return (
    <>
      {status === FETCHING_STATUS && <State message="Updating..." />}
      <div className="header">
        <h1>
          Welcome back
          {isEditing || (
            <>
              <br />
              {firstName} {lastName} !
            </>
          )}
        </h1>
        {isEditing ? (
          <form className="form-profile" onSubmit={submit}>
            <div className="form-profile-grid">
              <input
                id="firstName"
                className="input-firstname"
                type="text"
                defaultValue={firstName}
              />
              <input
                id="lastName"
                className="input-lastname"
                type="text"
                defaultValue={lastName}
              />
              <button className="save-button" type="submit">
                Save
              </button>
              <button
                className="cancel-button"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
            {error && <div className="error">{error}</div>}
          </form>
        ) : (
          <button
            className="edit-button"
            type="button"
            onClick={() => setIsEditing(true)}
          >
            Edit Name
          </button>
        )}
      </div>
    </>
  );
}

UserHeader.propTypes = {};

export default UserHeader;
