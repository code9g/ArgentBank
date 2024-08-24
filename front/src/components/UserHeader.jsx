import { useState } from "react";
import { useProfileSelector } from "../redux/hooks";
import ProfileEdit from "./forms/ProfileEdit";

function UserHeader() {
  const [isEditing, setIsEditing] = useState(false);

  const {
    isPending,
    user: { firstName, lastName },
  } = useProfileSelector();

  const open = () => setIsEditing(true);
  const close = () => setIsEditing(false);

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
              ) : isPending ? (
                <i className="waiting">Waiting data...</i>
              ) : (
                "Missing data"
              )}
            </>
          )}
        </h1>
        {isEditing ? (
          <ProfileEdit close={close} />
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
