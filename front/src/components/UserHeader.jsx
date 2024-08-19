import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFirstName } from "../redux/slices/loginSlice";
import { setAll } from "../redux/slices/profileSlice";
import { updateUserProfile } from "../services/api";
import State from "./State";

function UserHeader() {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { firstName, lastName } = useSelector((state) => state.profile);

  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();

    const firstName = e.target["firstName"].value;
    const lastName = e.target["lastName"].value;

    setIsFetching(true);
    updateUserProfile({ firstName, lastName }, token)
      .then(async (data) => {
        dispatch(setAll(data.body));
        dispatch(updateFirstName(data.body.firstName));
        setIsEditing(false);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError(error.statusText);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

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
          <form
            onSubmit={submit}
            style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "1rem",
              }}
            >
              <input
                id="firstName"
                className="input-firstname"
                type="text"
                defaultValue={firstName}
              />
              <button className="save-button" type="submit">
                Save
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "1rem",
              }}
            >
              <input
                id="lastName"
                className="input-lastname"
                type="text"
                defaultValue={lastName}
              />
              <button
                className="cancel-button"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
            {error && <div>{error}</div>}
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
