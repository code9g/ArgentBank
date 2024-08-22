import PropTypes from "prop-types";

function InputText({ id, label, required = false, onChange = null }) {
  return (
    <div className="input-text">
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} required={required} onChange={onChange} />
    </div>
  );
}

InputText.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
};

export default InputText;
