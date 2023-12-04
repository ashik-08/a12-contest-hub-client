import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import useSingleContest from "../../components/hooks/useSingleContest";
import moment from "moment/moment";

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "18px",
      color: "#424770",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#737373",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const CheckoutForm = () => {
  const { user } = useContext(AuthContext);
  const elements = useElements();
  const stripe = useStripe();
  const [postal, setPostal] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [contest] = useSingleContest(id);
  const navigate = useNavigate();

  const totalPrice = contest.contest_price;

  useEffect(() => {
    axiosSecure
      .post("/payments/create-payment-intent", { price: totalPrice })
      .then((response) => {
        console.log(response.data.clientSecret);
        setClientSecret(response.data.clientSecret);
      });
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const toastId = toast.loading("Processing Payment...");

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardNumberElement);

    if (card === null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        name: user?.displayName,
        email: user?.email,
        address: {
          postal_code: postal,
        },
      },
    });

    if (error) {
      console.log("error", error);
      toast.error(error.message, { id: toastId });
    } else {
      console.log("PaymentMethod", paymentMethod);
      toast.loading("Transferring Now...", { id: toastId });
    }

    // Confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
            address: {
              postal_code: postal,
            },
          },
        },
      });
    if (confirmError) {
      console.log("confirmError", confirmError);
      toast.error(confirmError.message, { id: toastId });
    } else {
      console.log("PaymentIntent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        // save the payment in the database
        const payment = {
          contestName: contest?.contest_name,
          contestId: contest?._id,
          email: user?.email,
          amount: totalPrice,
          transactionId: paymentIntent.id,
          paymentDate: moment().format("dddd, MMMM DD, YYYY, hh:mm:ss A, Z"),
        };
        const register = {
          contestId: contest?._id,
          contest_name: contest?.contest_name,
          contest_image: contest?.contest_image,
          contest_deadline: contest?.contest_deadline,
          participant_name: user?.displayName,
          participant_email: user?.email,
          participant_photo: user?.photoURL,
          prize_money: contest?.prize_money,
          submission_instruction: contest?.submission_instruction,
          status: "registered",
        };
        const response = await axiosSecure.post("/payments", {
          payment,
          register,
        });
        if (response.status === 201 && response.statusText === "Created") {
          toast.success("Payment Successful.", { id: toastId });
          navigate("/all-contest");
        }
      }
    }
  };

  return (
    <form className="px-5 xl:px-10 2xl:px-20" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <span className="space-y-4">
          <label htmlFor="cardNumber" className="text-lg font-semibold">
            Card Number
          </label>
          <CardNumberElement
            id="cardNumber"
            className="bg-gray-50 w-full px-6 py-4 rounded-lg outline outline-1 outline-para"
            options={ELEMENT_OPTIONS}
          />
        </span>
        <span className="space-y-4">
          <label htmlFor="expiry" className="text-lg font-semibold">
            Card Expiration
          </label>
          <CardExpiryElement
            id="expiry"
            className="bg-gray-50 w-full px-6 py-4 rounded-lg outline outline-1 outline-para"
            options={ELEMENT_OPTIONS}
          />
        </span>
        <span className="space-y-4">
          <label htmlFor="cvc" className="text-lg font-semibold">
            CVC
          </label>
          <CardCvcElement
            id="cvc"
            className="bg-gray-50 w-full px-6 py-4 rounded-lg outline outline-1 outline-para"
            options={ELEMENT_OPTIONS}
          />
        </span>
        <span className="space-y-4">
          <label htmlFor="postal" className="text-lg font-semibold">
            Postal Code
          </label>
          <input
            id="postal"
            className="tracking-wide bg-gray-50 w-full px-6 py-3.5 rounded-lg outline outline-1 outline-para"
            placeholder="12345"
            onChange={(e) => {
              setPostal(e.target.value);
            }}
            style={{
              fontSize: "17px",
              color: "#424770",
              "::placeholder": { color: "#737373" },
            }}
            required
          />
        </span>
      </div>
      <span className="flex justify-center mt-10">
        <button
          disabled={!stripe || !elements || !clientSecret}
          className="bg-gradient-to-r from-[#835D23] to-[#B58130] text-white text-xl font-semibold py-4 px-10 w-full max-w-xs rounded-lg"
        >
          <input
            disabled={!stripe || !elements || !clientSecret}
            className="cursor-pointer"
            type="submit"
            value={`Pay $${totalPrice}`}
          />
        </button>
      </span>
      {transactionId && (
        <p className="text-center text-green-500 text-lg font-medium mt-10">
          Your Transaction Id: {transactionId}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
