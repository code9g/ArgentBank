import PropTypes from "prop-types";
import Feature from "./Feature";

function Features({ items }) {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {items.map((feature, index) => (
        <Feature key={index} {...feature} />
      ))}
    </section>
  );
}

Features.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

export default Features;
