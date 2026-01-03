"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
// Replaced specific Next.js/NextAuth imports with standard React logic for the preview environment
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Chrome,
  Compass,
  Sparkles,
} from "lucide-react";

// Mocking Toast and Router behavior for the standalone preview environment
const toast = {
  error: (msg) => console.log("Toast Error:", msg),
  success: (msg) => console.log("Toast Success:", msg),
};

const Page = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Mocking the Google Sign In behavior

  const onSubmit = async (data) => {
    setErrorMsg("");
    setIsSubmitting(true);
    try {
      // Logic preserved from your original code
      const res = await fetch("api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });
      const result = await res.json();

      if (result.success) {
        // In a real Next.js app, this would be router.push("/login")
        router.push("/login");
      } else {
        setErrorMsg("Email already exists");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col lg:flex-row overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Visual Side — The "Aura" Brand Identity */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 border-r border-white/5">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 p-12 space-y-8 max-w-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
              <Compass className="text-indigo-400" size={32} />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">
              Aura Resume
            </span>
          </div>

          <h2 className="text-6xl font-black leading-tight text-white italic">
            Design Code. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Build Careers.
            </span>
          </h2>

          <p className="text-lg text-slate-400 leading-relaxed font-light">
            Craft high-conversion portfolios and resumes that stand out in the
            most competitive talent pools.
          </p>

          <div className="flex gap-4 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full border-2 border-[#020617] bg-slate-800 flex items-center justify-center text-[10px] font-bold`}
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="text-sm text-slate-500 self-center">
              <strong className="text-slate-300">Trusted</strong> by 10k+ tech
              professionals
            </div>
          </div>
        </div>
      </div>

      {/* Form Side — Signup UI */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
        <div className="lg:hidden absolute inset-0 bg-[#020617] -z-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[80px]" />
        </div>

        <div className="w-full max-w-[440px] space-y-10">
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-white tracking-tight italic">
              Initialize Studio
            </h3>
            <p className="text-slate-500 font-medium">
              Create your credentials to begin designing.
            </p>
          </div>
          {errorMsg && (
            <div className="w-full mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 text-center">
              {errorMsg}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Field: Username */}
            <div className="group space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 group-focus-within:text-indigo-400 transition-colors ml-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <User size={18} />
                </div>
                <input
                  {...register("username", { required: true })}
                  placeholder="TheCreativeDev"
                  className="w-full bg-white/5 border border-white/10 focus:border-indigo-500/50 focus:bg-white/[0.07] px-12 py-4 rounded-2xl outline-none transition-all text-white placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Field: Email */}
            <div className="group space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 group-focus-within:text-indigo-400 transition-colors ml-1">
                Work Email
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="hello@aura.design"
                  className="w-full bg-white/5 border border-white/10 focus:border-indigo-500/50 focus:bg-white/[0.07] px-12 py-4 rounded-2xl outline-none transition-all text-white placeholder:text-slate-600"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400 mt-1 ml-1 font-medium italic">
                  This field is required
                </p>
              )}
            </div>

            {/* Field: Password */}
            <div className="group space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 group-focus-within:text-indigo-400 transition-colors ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 3,
                      message: "Password must be at least 3 characters",
                    },
                  })}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 focus:border-indigo-500/50 focus:bg-white/[0.07] px-12 py-4 rounded-2xl outline-none transition-all text-white placeholder:text-slate-600"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 mt-1 ml-1 font-medium italic">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-full group overflow-hidden bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(79,70,229,0.2)] hover:shadow-[0_15px_40px_rgba(79,70,229,0.4)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? "Initializing..." : "Launch Workspace"}
                {!isSubmitting && (
                  <ArrowRight
                    size={18}
                    className={`transition-transform duration-300 ${
                      isHovered ? "translate-x-1" : ""
                    }`}
                  />
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Already have a account?{" "}
            <a
              href="/login"
              className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors"
            >
              Login
            </a>
          </p>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `,
        }}
      />
    </div>
  );
};

export default Page;
