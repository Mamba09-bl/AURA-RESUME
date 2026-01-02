// "use client";
// import CheckoutPage from '../components/CheckoutPage';
// import convertToSubcurrency from '../../lib/convertToSubcurrency';
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";


// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);


// export default function Home() {

//   const amount = 49.99;
//   return (
//     <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
//       <div className="mb-10">
//         <h1 className="text-4xl font-extrabold mb-2">Nothing</h1>
//         {/* {console.log(session)} */}
//         <h2 className="text-2xl">
//           has requested
//           <span className="font-bold"> ${amount}</span>
//         </h2>
//       </div>

//       <Elements
//         stripe={stripePromise}
//         options={{
//           // ✔ correct key name
//           mode: "payment",
//           amount: convertToSubcurrency(amount),
//           currency: "usd",
//         }}
//       >
//         <CheckoutPage amount={amount} />
//       </Elements>
//     </main>
//   );
// }






"use client";

import React from "react";
import { ShieldCheck, Lock, CreditCard } from "lucide-react";

/**
 * NOTE: The following imports are commented out to allow the preview to run 
 * in this environment. In your actual project, keep these active.
 */
// import CheckoutPage from '../components/CheckoutPage';
// import convertToSubcurrency from '../../lib/convertToSubcurrency';
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// --- PREVIEW MOCKS (DO NOT INCLUDE IN YOUR CODE) ---
import CheckoutPage from '../components/CheckoutPage';
import convertToSubcurrency from '../../lib/convertToSubcurrency';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutPagee = ({ amount }) => (
  <div className="space-y-4">
    <div className="p-4 rounded-xl bg-[#161c2e] border border-gray-700/50 space-y-3">
      <div className="h-4 bg-gray-800 rounded w-3/4 animate-pulse" />
      <div className="h-10 bg-gray-800 rounded-lg w-full animate-pulse" />
    </div>
    <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-bold text-lg shadow-[0_10px_20px_rgba(79,70,229,0.3)] transition-all">
      Pay ${amount}
    </button>
  </div>
);
// --- END PREVIEW MOCKS ---

export default function Home() {
  const amount = 49.99;

  return (
    <main className="min-h-screen bg-[#0e0f15] flex items-center justify-center p-4 md:p-6 font-sans relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-gray-900 rounded-3xl shadow-2xl border border-gray-800 overflow-hidden relative z-10">
        
        {/* Left Side: Order Details / Branding */}
        <div className="p-8 md:p-12 lg:border-r border-gray-800 flex flex-col justify-between relative bg-[#11131a]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-widest">
              <ShieldCheck size={14} />
              <span>Secure Checkout</span>
            </div>

            <div className="space-y-2">
              {/* <h2 className="text-gray-400 text-lg font-medium">Payment Request from</h2> */}
              {/* <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Nothing
              </h1> */}
              
              <div className="h-px w-full bg-gradient-to-r from-gray-700 via-gray-800 to-transparent my-8" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-gray-400">
                  <span>Standard License</span>
                  <span className="font-mono text-white">${amount}</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>Processing Fee</span>
                  <span className="font-mono text-white">$0.00</span>
                </div>
                <div className="flex justify-between items-center text-white text-xl font-bold pt-6 border-t border-gray-800">
                  <span>Total Due</span>
                  <span className="text-indigo-400">${amount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-sm text-gray-500 flex items-center gap-2">
            <Lock size={14} className="text-gray-400" />
            <p>Payments are processed securely by Stripe.</p>
          </div>
        </div>

        {/* Right Side: Payment Form */}
        <div className="p-8 md:p-12 bg-gray-900/50 backdrop-blur-sm flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
              <CreditCard className="text-indigo-500" size={20} />
              Payment Details
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Enter your payment information to complete the transaction.
            </p>
          </div>

          <Elements
        stripe={stripePromise}
        options={{
          // ✔ correct key name
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
        </div>
      </div>
    </main>
  );
}