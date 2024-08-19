import PropTypes from "prop-types";

function InputCheckbox({ id, label, required = false }) {
  return (
    <div className="input-checkbox">
      <input type="checkbox" id={id} required={required} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

InputCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default InputCheckbox;
