import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import Summary from "../../components/Summary/Summary";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  return (
    <section className="checkout">
      <div className="container">
        <GoBackButton className="checkout__goback" />
        <div className="checkout__content">
          <CheckoutForm />
          <Summary />
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
