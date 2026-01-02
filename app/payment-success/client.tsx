"use client";
import React from 'react';
import { Check, ArrowRight, Sparkles, ShieldCheck, Receipt } from 'lucide-react';
import { useSearchParams,useRouter } from "next/navigation";


export default function PaymentSuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");
  const email = searchParams.get("email");
  const id = searchParams.get("userId")
console.log(id);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e0f15] p-6 relative overflow-hidden font-sans">
      
      {/* Ambient Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          
          {/* Top Decorative Gradient Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-50" />

          <div className="flex flex-col items-center text-center space-y-8">
            
            {/* Icon Container with Signature Glow */}
            <div className="relative mt-2">
              <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-40 rounded-full animate-pulse" />
              <div className="relative p-4 bg-gray-900 border border-gray-800 rounded-2xl shadow-inner">
                <div className="p-3 bg-indigo-500 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.5)] text-white">
                   <ShieldCheck size={40} strokeWidth={2.5} />
                </div>
              </div>
              
              {/* Floating Sparkle Decoration */}
              <div className="absolute -top-3 -right-3 text-indigo-300 animate-bounce delay-75">
                <Sparkles size={24} fill="currentColor" className="opacity-80" />
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Payment Successful!
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed mx-auto">
                Thank you for upgrading to <br />
                <span className="text-indigo-400 font-bold tracking-wide text-lg shadow-indigo-500/20 drop-shadow-sm">AURA RESUME</span>
              </p>
            </div>

            {/* Session Info Box */}
            <div className="w-full space-y-4">
              {sessionId && (
                <div className="w-full bg-[#161c2e] border border-gray-700/50 rounded-xl p-4 flex flex-col items-center gap-1.5 transition-colors hover:border-gray-600">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500">
                    <Receipt size={12} />
                    <span>Transaction ID</span>
                  </div>
                  <span className="text-xs font-mono text-indigo-300 break-all bg-indigo-500/10 px-2 py-1 rounded">
                    {sessionId}
                  </span>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="w-full space-y-4">
              <button
                onClick={() => router.push(`/Resumes/${id}`)}
                className="group w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-bold text-lg shadow-[0_10px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_15px_25px_rgba(79,70,229,0.4)] transition-all flex items-center justify-center gap-2 transform active:scale-95"
              >
                <span>Go to Resumes</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              
              <p className="text-xs text-gray-600">
                A confirmation has been sent to <span className="text-gray-500">{email || 'your email'}</span>.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}