import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useProfileSelector } from "../../redux/hooks";
import { profileClearError } from "../../redux/slices/profileSlice";
import { updateProfileThunk } from "../../redux/thunk";
import { promiseError } from "../../utils/consts";

function ProfileEdit({ close }) {
  const {
    isError,
    error,
    user: { firstName, lastName },
  } = useProfileSelector();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        dispatch(
          updateProfileThunk({
            firstName: e.target["firstName"].value,
            lastName: e.target["lastName"].value,
          })
        ).unwrap(),
        {
          pending: "Updating...",
          success: "Your profile has been successfully updated",
          error: promiseError,
        }
      );
      close();
    } catch (error) {
      // No report error
    }
  };

  const handleChange = () => {
    dispatch(profileClearError());
  };

  const handleCancel = () => {
    dispatch(profileClearError());
    close();
  };

  return (
    <form name="profile-edit" className="form-profile" onSubmit={handleSubmit}>
      <div className="form-profile-grid">
        <input
          id="firstName"
          className="input-firstname"
          type="text"
          placeholder={firstName}
          defaultValue={firstName}
          onChange={handleChange}
          minLength={2}
          required
        />
        <input
          id="lastName"
          className="input-lastname"
          type="text"
          placeholder={lastName}
          defaultValue={lastName}
          onChange={handleChange}
          minLength={2}
          required
        />
        <button className="save-button" type="submit">
          Save
        </button>
        <button className="cancel-button" type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
      {isError && <div className="error">{error}</div>}
    </form>
  );
}

ProfileEdit.propTypes = {
  close: PropTypes.func,
};

export default ProfileEdit;
