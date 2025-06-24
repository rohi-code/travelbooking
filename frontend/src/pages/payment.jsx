import React from 'react';

const PaymentPage = () => {
  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      const options = {
        key: 'rzp_test_1HvMkP90RnAOqH', 
        amount: 50000, 
        currency: 'INR',
        name: 'Flight Movies',
        description: 'Ticket Booking Payment',
        image: 'https://yourwebsite.com/logo.png',
        handler: function (response) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    };
    document.body.appendChild(script);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Proceed to Payment</h1>
      <button
        onClick={loadRazorpay}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;