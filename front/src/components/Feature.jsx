import PropTypes from "prop-types";

function Feature({ title, icon, alt, description }) {
  return (
    <div className="feature-item">
      <img src={icon} alt={alt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

Feature.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.any,
  alt: PropTypes.string,
  description: PropTypes.string,
};

export default Feature;
