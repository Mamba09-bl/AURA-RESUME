"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Mail, Lock, ArrowRight, Compass } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setErrorMsg("");
    const res = await fetch("api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const result = await res.json();

    if (result.success) {
      router.push("/Resumes");
    } else {
      setErrorMsg("Email Or Password Wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col lg:flex-row overflow-hidden">
      {/* LEFT BRAND SIDE */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 border-r border-white/5">
        <div className="absolute inset-0">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 p-12 space-y-8 max-w-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
              <Compass className="text-indigo-400" size={32} />
            </div>
            <span className="text-xl font-black uppercase italic text-white">
              Aura Resume
            </span>
          </div>

          <h2 className="text-6xl font-black italic leading-tight text-white">
            Welcome Back. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Continue Building.
            </span>
          </h2>

          <p className="text-lg text-slate-400 font-light">
            Log in to manage your resumes and unlock premium tools.
          </p>
        </div>
      </div>

      {/* RIGHT FORM SIDE */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-[440px] space-y-10">
          <div>
            <h3 className="text-3xl font-black italic text-white">
              Login to Workspace
            </h3>
            <p className="text-slate-500 font-medium">
              Enter your credentials to continue.
            </p>
          </div>

          {errorMsg && (
            <div className="w-full mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 text-center">
              {errorMsg}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* EMAIL */}
            <div className="group space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Email
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="you@email.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-indigo-500/50 px-12 py-4 rounded-2xl outline-none text-white placeholder:text-slate-600"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400 italic">Email is required</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="group space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters",
                    },
                  })}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 focus:border-indigo-500/50 px-12 py-4 rounded-2xl outline-none text-white placeholder:text-slate-600"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 italic">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-2xl font-black uppercase tracking-widest text-sm text-white transition-all shadow-lg hover:-translate-y-0.5"
            >
              <span className="flex items-center justify-center gap-2">
                Login
                <ArrowRight
                  size={18}
                  className={`transition-transform ${
                    isHovered ? "translate-x-1" : ""
                  }`}
                />
              </span>
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Don’t have an account?{" "}
            <a
              href="/"
              className="text-indigo-400 font-bold hover:text-indigo-300"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
