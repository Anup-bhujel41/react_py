import React, { useState } from 'react';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51HmQ6yDvx1549lk5zlQu2UTcarzAgDT2SIP0BLJLWGWuxCvJ4LjtzGePwEVlR4tFRerJQ0wvxlgVsSqRP0ntSbjz00eVVcHLkw');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a payment method using the card element
    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
    } else {
      setPaymentError(null);
      setPaymentSuccess('Payment successful');
      window.location = "/complete-order";

      // Send the payment method ID to your server for further processing
      // You can make an API request to your backend and handle the payment server-side
      // Example:
      // const response = await fetch('/api/process-payment', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ paymentMethodId: paymentMethod.id })
      // });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <h1>Stripe Checkout</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="cardElement">Card Details</label>
              <CardElement id="cardElement" className="form-control" options={{ style: { base: { fontSize: '16px' } } }} />
            </div>

            {paymentError && <div className="alert alert-danger">{paymentError}</div>}
            {paymentSuccess && <div className="alert alert-success">{paymentSuccess}</div>}

            <button type="submit" className="btn btn-primary rounded" disabled={!stripe}>
              Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const StripeCheckout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeCheckout;
