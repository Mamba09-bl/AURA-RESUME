"use client";

import React, { useState,useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const { data: session } = useSession();
  const [email, setEmail] = useState(session?.user?.email ||"");
  const [loading, setLoading] = useState(false);
   const router = useRouter();

  useEffect(() => {
  async function loadEmail() {
    const ress = await fetch("/api/ai");
      const result = await ress.json();
      console.log(result);
      
     if (result.alreadyPaid) {
        router.push(`/alreadyPaid/?userId=${result.id}`);
      }
      
    if (session?.user?.email) {
      setEmail(session.user.email);
      return;
    }

    const res = await fetch("/api/me");
    const data = await res.json();

    if (data?.user?.email) {
      setEmail(data.user.email);
    }
  }

  loadEmail();
}, [session]);

  const handleCheckout = async () => {
    if (!email) return alert("Email required");

    setLoading(true);

    const res = await fetch("/api/checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    console.log('i am from frontend',data);
    

    if (data.url) {
      window.location.href = data.url; // redirect to Stripe page
    } else {
      alert("Error creating checkout session");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCheckout();
      }}
      className="bg-white p-4 rounded-md text-black"
    >
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-3"
        required
      />

      <button
        disabled={loading}
        className="bg-black w-full text-white p-3 rounded-md"
      >
        {loading ? "Redirecting..." : `Pay $${amount}`}
      </button>
    </form>
  );
};

export default CheckoutPage;
