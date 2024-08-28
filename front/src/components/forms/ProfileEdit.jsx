import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useAuthSelector } from "../../redux/hooks";
import { useUpdateProfileMutation } from "../../redux/services/bankApi";

function ProfileEdit({ close }) {
  const { user } = useAuthSelector();

  const [updateProfile, { isLoading, isError, error }] =
    useUpdateProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const target = e.currentTarget;
    const profile = {
      firstName: target["firstName"].value,
      lastName: target["lastName"].value,
    };

    if (profile.firstName == "") {
      profile.firstName = user?.firstName;
    }

    if (profile.lastName == "") {
      profile.lastName = user?.lastName;
    }

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
      {/* {isLoading && <Smoke />} */}
      <div className="form-profile-grid">
        <input
          id="firstName"
          className="input-firstname"
          type="text"
          placeholder={user?.firstName}
          disabled={isLoading}
        />
        <input
          id="lastName"
          className="input-lastname"
          type="text"
          placeholder={user?.lastName}
          disabled={isLoading}
        />
        <button className="save-button" type="submit" disabled={isLoading}>
          Save
        </button>
        <button
          className="cancel-button"
          type="button"
          disabled={isLoading}
          onClick={close}
        >
          Cancel
        </button>
      </div>
      {isError && <div className="error">{error.message}</div>}
    </form>
  );
}

ProfileEdit.propTypes = {
  close: PropTypes.func,
};

export default ProfileEdit;
