import { Helmet } from "react-helmet-async";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  return (
    <>
      <Helmet>
        <title>Contest Hub | Make Payment</title>
      </Helmet>
      <section>
        <SectionTitle subHeading={"--- Register now ---"} heading={"make payment"} />
        <div className="container mx-auto">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </section>
    </>
  );
};

export default Payment;
