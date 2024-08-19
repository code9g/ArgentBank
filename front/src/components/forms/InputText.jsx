import PropTypes from "prop-types";

function InputText({ id, label, required = false }) {
  return (
    <div className="input-text">
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} required={required} />
    </div>
  );
}

InputText.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
};

export default InputText;
