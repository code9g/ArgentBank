import PropTypes from "prop-types";
import { currencyFormat } from "../utils/consts";

function Account({ title, operations, amount, description }) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{`${title} (x${operations})`}</h3>
        <p className="account-amount">{currencyFormat.format(amount)}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
}

Account.propTypes = {
  title: PropTypes.string.isRequired,
  operations: PropTypes.number,
  amount: PropTypes.number,
  description: PropTypes.string,
};

export default Account;
