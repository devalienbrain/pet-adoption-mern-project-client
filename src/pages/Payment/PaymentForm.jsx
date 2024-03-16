/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import "./form.css";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentForm = ({ data, closeModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  console.log(data);
  const donateAmount = Number(data.amount);
  console.log(donateAmount);

  const [amount, setAmount] = useState(donateAmount);
  const changeamount = (e) => {
    setAmount(e.target.value);
  };

  const axiosSecure = useAxiosSecure();
  // Create Payment Intent
  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: amount })
      .then((res) => {
        console.log(res.data);
        setClientSecret(res.data);
      });
  }, [amount, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("payment method", paymentMethod);
    }

    setProcessing(true);
    console.log(clientSecret);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
    }
    console.log("payment intent", paymentIntent);

    if (paymentIntent.status === "succeeded") {
      // save payment information to the server
      // Update room status in db
      const info = {
        Email: user?.email,
        Name: user?.displayName,
        PaymentName: data.name,
        amount: data.amount,
        transactionId: paymentIntent.id,
        date: new Date(),
      };
      console.log(info);
      axiosSecure.post("/payments", info).then((res) => {
        console.log(res.data);
        if (res.data._id) {
          setProcessing(false);
          navigate("/");
          toast.success("You donated Successfuly");
        }
      });
    }
  };

  return (
    <>
      <form className="my-2" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div>
          <input
            required
            onChange={changeamount}
            type="number"
            name="amount"
            placeholder="Amount"
            defaultValue={donateAmount}
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex mt-2 justify-around">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe || !clientSecret || processing}
            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            {processing ? (
              <ImSpinner9 className="m-auto animate-spin" size={24} />
            ) : (
              `Pay $${amount}`
            )}
          </button>
        </div>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
    </>
  );
};

export default PaymentForm;
