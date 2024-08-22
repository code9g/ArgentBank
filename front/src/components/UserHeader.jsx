import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { userUpdate } from "../redux/actions";
import { useAuthSelector, useProfileSelector } from "../redux/hooks";
import { toastify } from "../utils/functions";
import State from "./State";

function UserHeader() {
  const [isEditing, setIsEditing] = useState(false);

  const {
    isFetching,
    error,
    user: { firstName, lastName },
  } = useProfileSelector();
  const { token } = useAuthSelector();

  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    const id = toast.loading("Updating...");
    dispatch(
      userUpdate(token, {
        firstName: e.target["firstName"].value,
        lastName: e.target["lastName"].value,
      })
    )
      .then(() => {
        toast.update(
          id,
          toastify({
            render: "Your profile has been successfully updated",
            type: "success",
          })
        );
        setIsEditing(false);
      })
      .catch((error) => {
        toast.update(
          id,
          toastify({
            render: error.statusText || error.message,
            type: "error",
          })
        );
      });
  };

  return (
    <>
      {isFetching && <State />}
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
                defaultValue={firstName}
                minLength={2}
                required
              />
              <input
                id="lastName"
                className="input-lastname"
                type="text"
                placeholder={lastName}
                defaultValue={lastName}
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
