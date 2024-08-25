import { useState } from "react";
import { useAuthSelector } from "../redux/hooks";
import ProfileEdit from "./forms/ProfileEdit";

function UserHeader() {
  const [isEditing, setIsEditing] = useState(false);

  const { user } = useAuthSelector();

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
              {`${user?.firstName} ${user?.lastName}`}
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
