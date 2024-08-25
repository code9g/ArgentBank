import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useAuthSelector } from "../../redux/hooks";
import { useUpdateProfileMutation } from "../../redux/services/bankApi";
import Smoke from "../Smoke";

function ProfileEdit({ close }) {
  const { user } = useAuthSelector();

  const [updateProfile, { isPending, isError, error }] =
    useUpdateProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const target = e.currentTarget;
    const profile = {
      firstName: target["firstName"].value,
      lastName: target["lastName"].value,
    };

    toast.promise(
      updateProfile(profile)
        .unwrap()
        .then(() => close()),
      {
        pending: "Updating...",
        success: "Profile successfully updated !",
        error: {
          render: ({ data: error }) => error.message,
        },
      }
    );
  };

  return (
    <form name="profile-edit" className="form-profile" onSubmit={handleSubmit}>
      {isPending && <Smoke />}
      <div className="form-profile-grid">
        <input
          id="firstName"
          className="input-firstname"
          type="text"
          placeholder={user?.firstName}
          defaultValue={user?.firstName}
          minLength={2}
          required
        />
        <input
          id="lastName"
          className="input-lastname"
          type="text"
          placeholder={user?.lastName}
          defaultValue={user?.lastName}
          minLength={2}
          required
        />
        <button className="save-button" type="submit">
          Save
        </button>
        <button className="cancel-button" type="button" onClick={close}>
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
