import PropTypes from "prop-types";
import { useAuthSelector } from "../../redux/hooks";
import { useUpdateProfileMutation } from "../../redux/services/bankApi";
import Smoke from "../Smoke";

function ProfileEdit({ close }) {
  const {
    user: { firstName, lastName },
  } = useAuthSelector();

  const [updateProfile, { isPending, isError, error }] =
    useUpdateProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profile = {
      firstName: e.target["firstName"].value,
      lastName: e.target["lastName"].value,
    };
    const { data } = await updateProfile(profile);
    if (data) {
      close();
    }
  };

  const handleCancel = () => {
    close();
  };

  return (
    <form name="profile-edit" className="form-profile" onSubmit={handleSubmit}>
      {isPending && <Smoke />}
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
