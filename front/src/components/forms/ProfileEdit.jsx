import PropTypes from "prop-types";
import { useProfileSelector } from "../../redux/hooks";

function ProfileEdit({ onSubmit, onCancel }) {
  const {
    error,
    user: { firstName, lastName },
  } = useProfileSelector();
  return (
    <form className="form-profile" onSubmit={onSubmit}>
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
        <button className="cancel-button" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

ProfileEdit.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ProfileEdit;
