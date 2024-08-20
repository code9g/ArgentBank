import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userUpdate } from "../redux/actions";
import { useLoginSelector, useProfileSelector } from "../redux/hooks";
import State from "./State";

function UserHeader() {
  const [isEditing, setIsEditing] = useState(false);

  const {
    isFetching,
    error,
    user: { firstName, lastName },
  } = useProfileSelector();
  const { token } = useLoginSelector();

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
    setIsEditing(false);
  }, [isFetching]);

  return (
    <>
      {isFetching && <State message="Updating..." />}
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
                placeholder={firstName}
                minLength={2}
                required
              />
              <input
                id="lastName"
                className="input-lastname"
                type="text"
                placeholder={lastName}
                minLength={2}
                required
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
