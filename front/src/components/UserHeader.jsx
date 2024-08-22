import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { userUpdate } from "../redux/actions";
import { useAuthSelector, useProfileSelector } from "../redux/hooks";
import ProfileEdit from "./forms/ProfileEdit";

function UserHeader() {
  const [isEditing, setIsEditing] = useState(false);

  const {
    isFetching,
    user: { firstName, lastName },
  } = useProfileSelector();
  const { token } = useAuthSelector();

  const dispatch = useDispatch();

  const open = () => setIsEditing(true);
  const cancel = () => setIsEditing(false);
  const submit = async (e) => {
    e.preventDefault();
    toast
      .promise(
        dispatch(
          userUpdate(token, {
            firstName: e.target["firstName"].value,
            lastName: e.target["lastName"].value,
          })
        ),
        {
          pending: "Updating...",
          success: "Your profile has been successfully updated",
          error: {
            render: ({ data }) => {
              return data.statusText || data.error;
            },
          },
        }
      )
      .then(() => setIsEditing(false));
  };

  return (
    <>
      <div className="header">
        <h1>
          Welcome back
          {isEditing || (
            <>
              <br />
              {firstName || lastName ? (
                firstName + " " + lastName
              ) : isFetching ? (
                <i className="waiting">Waiting data...</i>
              ) : (
                "Missing data"
              )}
            </>
          )}
        </h1>
        {isEditing ? (
          <ProfileEdit onSubmit={submit} onCancel={cancel} />
        ) : (
          <button className="edit-button" type="button" onClick={open}>
            Edit Name
          </button>
        )}
      </div>
    </>
  );
}

UserHeader.propTypes = {};

export default UserHeader;
