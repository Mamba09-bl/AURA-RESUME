"use client";
export const dynamic = "force-dynamic";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function AlreadyPaidPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("userId");

  // Optional safety (recommended)
  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] text-white">
        Invalid access
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0b0f19] px-6">
      <div className="w-full max-w-xl bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl p-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20">
          <CheckCircle2 size={16} className="text-indigo-400" />
          <span className="text-xs font-black tracking-widest uppercase text-indigo-400">
            Subscription Active
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-black tracking-tight text-white mb-4">
          You’re Already on{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            AURA Resume
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-base leading-relaxed mb-8">
          Your premium access is active. You can use AI optimization, unlimited
          improvements, and advanced resume tools without limits.
        </p>

        {/* Status Card */}
        <div className="flex items-center justify-center gap-3 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-semibold p-4 rounded-2xl mb-10">
          <CheckCircle2 size={20} />
          AURA Pro — Fully Enabled
        </div>

        {/* Action */}
        <button
          onClick={() => router.push(`/Resumes/${id}`)}
          className="px-10 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-[0.3em]
          hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-105 active:scale-95
          shadow-xl shadow-indigo-500/10"
        >
          Go Back to Dashboard
        </button>
      </div>
    </div>
  );
}
