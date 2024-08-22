import PropTypes from "prop-types";

function InputEmail({ id, label, required = false, onChange = null }) {
  return (
    <div className="input-text">
      <label htmlFor={id}>{label}</label>
      <input type="email" id={id} required={required} onChange={onChange} />
    </div>
  );
}

InputEmail.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
};

export default InputEmail;
