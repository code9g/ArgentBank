import PropTypes from "prop-types";

function InputCheckbox({ id, label, required = false, onChange = null }) {
  return (
    <div className="input-checkbox">
      <input type="checkbox" id={id} required={required} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

InputCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func,
};

export default InputCheckbox;
