"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Terminal,
  Plus,
  Sparkles,
  Layout,
  ArrowRight,
  MapPin,
  Briefcase,
  LogOut,
  Trash2,
} from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home({ resume }) {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  const [aboutYourself, setAboutYourself] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState("");
  const [showbutton, setButton] = useState(false);
  const [id, setId] = useState("");
  const [saveResume, setSaveResume] = useState(null);
  const [latestResume, setLatesteResume] = useState(null);
  const [paidDone, SetPaidDone] = useState(false);
  const [paidNot, SetPaidNot] = useState(false);
  const [notPaid, setNotPaid] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchResumes = async () => {
      const res = await fetch("/api/resume");
      const result = await res.json();
      console.log(result);
    };
    fetchResumes();
  }, []);

  useEffect(() => {
    if (!resume) {
      return;
    }

    setName(resume.name || "");
    setTitle(resume.title || "");
    setEmail(resume.email || "");
    setNumber(resume.number || "");
    setSkills(resume.skills || []);
    setEducation(resume.education || "");
    setAboutYourself(resume.aboutYourself || "");
    setId(resume._id);
    console.log("i am from another page", resume);

    setButton(true);
  }, [resume]);

  // useEffect(() => {
  //   console.log('i am from resume',);
  // }, [latestResume]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      title,
      aboutYourself,
    };
    // console.log(data);

    const res = await fetch("/api/resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        title,
        number,
        email,
        skills,
        education,
        aboutYourself,
      }),
    });
    const result = await res.json();
    console.log("i am frontend result", result);
    setId(result.user._id);
    setSaveResume(result.user);
    if (result.success === true) {
      router.push(`/Resumes/${result.user._id}`);
      setButton(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col lg:row gap-0 overflow-hidden lg:flex-row">
      <div className="fixed top-4 right-4 z-[999] flex flex-col gap-3">
        {/* LOGOUT */}
        <button
          onClick={async () => {
            await signOut({ redirect: false });
            await fetch("/api/logout");
            window.location.href = "/login";
          }}
          className="
      flex items-center gap-2 px-4 py-2 text-xs font-semibold
      text-gray-300 hover:text-white
      bg-gray-900/80 hover:bg-red-500/20
      border border-gray-700 hover:border-red-500/50
      rounded-xl backdrop-blur
      transition-all duration-200 shadow-lg
    "
        >
          <LogOut size={14} />
          Logout
        </button>

        {/* CLEAR ALL */}
        <button
          onClick={() => {
            router.push("/Resumes");
          }}
          className="
      flex items-center gap-2 px-5 py-2.5
      rounded-xl
      bg-gray-900/70 backdrop-blur
      border border-gray-700
      text-gray-300 text-sm font-semibold
      shadow-lg
      transition-all duration-300
      hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400
      active:scale-95
    "
        >
          <Trash2 size={16} />
          Clear All
        </button>
      </div>

      <button
        onClick={() => {
          router.push("/Resumes");
        }}
        className="
    fixed top-4 right-4 z-50
    flex items-center gap-2
    px-5 py-2.5
    rounded-xl
    bg-gray-900/70 backdrop-blur
    border border-gray-700
    text-gray-300 text-sm font-semibold
    shadow-lg
    transition-all duration-300
    hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400
    active:scale-95
  "
      >
        <Trash2 size={16} />
        Clear All
      </button>

      {/* LEFT COLUMN — FORM */}
      <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <Layout size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Portfolio Designer
            </h1>
          </div>
          <p className="text-gray-400 text-sm">
            Update your information below to see changes in real-time.
          </p>
        </header>

        <form onSubmit={onSubmit} className="space-y-8">
          <section className="space-y-4">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-indigo-400">
              <span className="h-px w-8 bg-indigo-500/50"></span>
              01. Identity
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500 ml-1">
                  Full Name
                </label>
                <input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Anderson"
                  required
                  className="w-full bg-[#161c2e] border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-4 py-3 rounded-xl outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500 ml-1">
                  Job Title
                </label>
                <input
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Software Engineer"
                  required
                  className="w-full bg-[#161c2e] border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-4 py-3 rounded-xl outline-none transition-all"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-4">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-indigo-400">
              <span className="h-px w-8 bg-indigo-500/50"></span>
              02. Connect
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  required
                  className="w-full bg-[#161c2e] border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-4 py-3 rounded-xl outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500 ml-1">
                  Phone Number
                </label>
                <input
                  name="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="+92 0 234 567 890"
                  required
                  className="w-full bg-[#161c2e] border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-4 py-3 rounded-xl outline-none transition-all"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-4">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-indigo-400">
              <span className="h-px w-8 bg-indigo-500/50"></span>
              03. Experience
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500 ml-1">
                Skills (Add one by one)
              </label>
              <div className="flex gap-2">
                <input
                  name="skill"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  placeholder="React, AWS, Python..."
                  className="flex-1 bg-[#161c2e] border border-gray-700 focus:border-indigo-500 px-4 py-3 rounded-xl outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!skill.trim()) return;
                    setSkills([...skills, skill]);
                    setSkill("");
                  }}
                  className="bg-gray-800 hover:bg-gray-700 p-3 rounded-xl border border-gray-700 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-medium text-gray-500 ml-1">
                Education
              </label>
              <textarea
                name="education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="Tell us about your degree and university..."
                rows={3}
                required
                className="w-full bg-[#161c2e] border border-gray-700 focus:border-indigo-500 px-4 py-3 rounded-xl outline-none transition-all resize-none"
              />
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-medium text-gray-500 ml-1">
                About Me
              </label>
              <textarea
                name="aboutYourself"
                value={aboutYourself}
                onChange={(e) => setAboutYourself(e.target.value)}
                placeholder="Write a brief intro..."
                rows={4}
                required
                className="w-full bg-[#161c2e] border border-gray-700 focus:border-indigo-500 px-4 py-3 rounded-xl outline-none transition-all resize-none"
              />
            </div>
          </section>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-xl font-bold text-lg shadow-[0_10px_20px_rgba(79,70,229,0.3)] transition-all flex items-center justify-center gap-2 group"
          >
            Save Resume
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </form>
      </div>

      {/* RIGHT COLUMN — LIVE PREVIEW */}
      <div className="flex w-full min-h-screen bg-[#0b0f19] p-4 md:p-8 lg:p-12 items-start justify-center overflow-y-auto custom-scrollbar">
        <div className="w-full max-w-4xl flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* HEADER */}
          <header className="text-center space-y-6">
            <div className="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
              <p className="text-[11px] text-indigo-400 font-black uppercase tracking-[0.3em]">
                Professional Profile
              </p>
            </div>

            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white break-words">
                {name || "Your Name"}
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 font-medium tracking-wide">
                {title || "Your Professional Title"}
              </p>
            </div>
          </header>

          {/* CONTENT */}
          <div className="space-y-10">
            {/* ABOUT */}
            <section className="bg-gray-900/30 border border-gray-800/50 p-6 md:p-10 rounded-3xl space-y-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-[11px] uppercase tracking-[0.3em] text-indigo-400 font-black flex items-center gap-4">
                  <span className="w-12 h-[2px] bg-indigo-500/40" />
                  Professional Biography
                </h2>

                {showbutton && (
                  <button
                    onClick={() =>
                      router.push(`/suggestAi/${id}?section=aboutYourself`)
                    }
                    className="
                opacity-100
                text-xs
                px-4 py-1.5
                rounded-full
                font-black uppercase tracking-widest
                bg-indigo-500/15 text-indigo-300
                border border-indigo-500/40
                hover:bg-indigo-500 hover:text-white
                transition
              "
                  >
                    AI Improve
                  </button>
                )}
              </div>

              <p className="text-lg md:text-xl leading-relaxed text-gray-200 font-light italic">
                {aboutYourself ||
                  "Share your professional journey and key achievements here."}
              </p>
            </section>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* SKILLS */}
              <section className="bg-gray-900/20 p-6 md:p-8 rounded-3xl border border-gray-800/40">
                <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
                  <h2 className="text-[11px] uppercase tracking-[0.3em] text-gray-400 font-black">
                    Core Expertise
                  </h2>

                  {showbutton && (
                    <button
                      onClick={() =>
                        router.push(`/suggestAi/${id}?section=skills`)
                      }
                      className="
                  text-xs
                  px-3 py-1
                  rounded-full
                  bg-cyan-500/15 text-cyan-300
                  border border-cyan-500/30
                  font-black tracking-widest
                  hover:bg-cyan-500 hover:text-white
                  transition
                "
                    >
                      AI Assist
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-100 font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </section>

              {/* EDUCATION */}
              <section className="bg-gray-900/20 p-6 md:p-8 rounded-3xl border border-gray-800/40">
                <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
                  <h2 className="text-[11px] uppercase tracking-[0.3em] text-gray-400 font-black">
                    Education
                  </h2>

                  {showbutton && (
                    <button
                      onClick={() =>
                        router.push(`/suggestAi/${id}?section=education`)
                      }
                      className="
                  text-xs
                  px-3 py-1
                  rounded-full
                  bg-cyan-500/15 text-cyan-300
                  border border-cyan-500/30
                  font-black tracking-widest
                  hover:bg-cyan-500 hover:text-white
                  transition
                "
                    >
                      AI Assist
                    </button>
                  )}
                </div>

                <div className="text-base text-gray-300 leading-relaxed whitespace-pre-line border-l-4 border-indigo-500/30 pl-6">
                  {education || "Academic background details."}
                </div>
              </section>
            </div>
          </div>

          {/* FOOTER */}
          <footer className="mt-8 mb-12 text-center">
            <button
              onClick={() => router.push("/allResumes")}
              className="px-10 py-4 bg-white text-black font-black text-xs uppercase tracking-[0.3em] rounded-full hover:bg-indigo-500 hover:text-white transition"
            >
              Manage All Resumes
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
