"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Zap,
  PenTool,
  Crown,
  ArrowRight,
  Lock,
  Check,
  AlertOctagon,
  LineChart,
  X,
} from "lucide-react";

const Page = () => {
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-rose-500/30">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Abstract shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-indigo-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-900/10 blur-[100px] rounded-full" />

        {/* Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-[480px] group perspective-1000">
        {/* Animated Border Gradient */}
        <div className="absolute -inset-[1px] bg-gradient-to-b from-rose-500/40 via-indigo-500/40 to-cyan-500/40 rounded-2xl opacity-100 blur-sm transition-all duration-500 group-hover:blur-md" />

        {/* Card Content */}
        <div className="relative bg-[#0a0a0a] rounded-2xl p-1 shadow-2xl overflow-hidden">
          {/* Inner Bezel */}
          <div className="bg-[#0f0f11] rounded-xl border border-white/5 p-8 relative overflow-hidden">
            {/* Status Bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-rose-500">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                System Alert
              </div>
              <div className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-slate-500">
                ERR_LIMIT_01
              </div>
            </div>

            {/* Central Icon Area */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Rotating Ring */}
                <div className="absolute inset-0 border border-dashed border-rose-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="w-24 h-24 bg-gradient-to-b from-rose-500/10 to-transparent rounded-full border border-rose-500/20 flex items-center justify-center relative backdrop-blur-sm">
                  <Lock className="w-10 h-10 text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]" />

                  {/* Floating Warning Badge */}
                  <div className="absolute -bottom-2 bg-[#0f0f11] border border-rose-500/30 text-rose-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <AlertOctagon size={12} /> Limit Reached
                  </div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="text-center space-y-3 mb-8">
              <h1 className="text-3xl font-black text-white tracking-tight">
                Capacity Exceeded
              </h1>
              <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-[90%] mx-auto">
                Your creative workspace is full. <br />
                <span className="text-indigo-400">
                  Expand your capabilities
                </span>{" "}
                to continue.
              </p>
            </div>

            {/* Offer Card */}
            <div className="bg-gradient-to-r from-indigo-900/20 to-cyan-900/20 border border-indigo-500/20 rounded-xl p-5 mb-8 relative overflow-hidden group/offer">
              <div className="absolute top-0 right-0 p-3 opacity-20 group-hover/offer:opacity-40 transition-opacity">
                <Crown size={60} />
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">
                  Pro Access
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">$49</span>
                  <span className="text-xs text-slate-500 font-bold uppercase">
                    / Lifetime
                  </span>
                </div>
              </div>
            </div>

            {/* Features List (Grid) */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <FeatureItem icon={Sparkles} text="AI Enhancer" />
              <FeatureItem icon={PenTool} text="Manual Suite" />
              <FeatureItem icon={Zap} text="Fast Gen" />
              <FeatureItem icon={Crown} text="Pro Assets" />
              <FeatureItem icon={LineChart} text="Optimization" />
            </div>

            {/* Primary Action */}
            <button
              onClick={() => {
                router.push("/checkout");
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-full bg-white text-black h-14 rounded-lg font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:bg-indigo-50"
            >
              <span className="relative z-10">Unlock Access</span>
              <ArrowRight
                size={16}
                className={`transition-transform duration-300 ${
                  isHovered ? "translate-x-1" : ""
                }`}
              />

              {/* Button Glow */}
              <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-0 hover:opacity-20 transition-opacity" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simplified Feature Component
const FeatureItem = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
    <Icon size={14} className="text-indigo-400" />
    <span className="text-[11px] font-bold text-slate-300">{text}</span>
  </div>
);

export default Page;
