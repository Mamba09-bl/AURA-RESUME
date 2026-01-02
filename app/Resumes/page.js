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

      {/*|||||||||||||||   RIGHT COLUMN — LIVE PREVIEW       |||||||||||||||||*/}
      {/* RIGHT COLUMN — LIVE PREVIEW */}
      <div className="flex w-full min-h-screen bg-[#0b0f19] p-4 md:p-8 lg:p-12 items-start justify-center overflow-y-auto custom-scrollbar">
        <div className="w-full max-w-4xl flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Modern Centered Header - Increased Size & Refined Spacing */}
          <header className="text-center space-y-6">
            <div className="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
              <p className="text-[11px] text-indigo-400 font-black uppercase tracking-[0.3em]">
                Professional Profile
              </p>
            </div>

            <div className="space-y-2">
              <h1 className="text-6xl md:text-7xl font-black tracking-tight text-white break-words">
                {name || "Your Name"}
              </h1>
              <p className="text-2xl text-gray-400 font-medium tracking-wide">
                {title || "Your Professional Title"}
              </p>
            </div>

            {/* Enhanced Contact Bar - Larger Text */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-2 text-base text-gray-300 font-semibold">
              <span className="flex items-center gap-2 hover:text-indigo-400 transition-colors cursor-default">
                <svg
                  className="w-4 h-4 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {number || "Phone Number"}
              </span>
              <span className="hidden md:block w-1.5 h-1.5 bg-gray-700 rounded-full" />
              <span className="flex items-center gap-2 hover:text-indigo-400 transition-colors cursor-default break-all">
                <svg
                  className="w-4 h-4 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {email || "Email Address"}
              </span>
            </div>
          </header>

          {/* Content Body - Removed rigid gap-12 to prevent unwanted white space */}
          <div className="space-y-10">
            {/* About Section */}
            <section className="bg-gray-900/30 border border-gray-800/50 p-10 rounded-3xl relative overflow-hidden group space-y-6">
              {/* Header Row */}
              <div className="flex items-start justify-between gap-6">
                <h2 className="text-[11px] uppercase tracking-[0.3em] text-indigo-400 font-black flex items-center gap-4">
                  <span className="w-12 h-[2px] bg-indigo-500/40" />
                  Professional Biography
                </h2>

                {showbutton && (
                  <button
                    onClick={() => {
                      router.push(`/suggestAi/${id}?section=aboutYourself`);
                    }}
                    className="
          opacity-100 
          lg:opacity-0 lg:group-hover:opacity-100 
          transition-all duration-200
          px-4 py-1.5
          text-[11px] font-black uppercase tracking-widest
          rounded-full
          bg-indigo-500/10 text-indigo-400
          border border-indigo-500/30
          hover:bg-indigo-500 hover:text-white
          shadow-sm
        "
                  >
                    AI Improve
                  </button>
                )}
              </div>

              {/* Content */}
              <p className="text-xl leading-relaxed text-gray-200 font-light italic max-w-3xl">
                {aboutYourself ||
                  "Share your professional journey and key achievements here."}
              </p>
            </section>

            {/* Grid for Skills and Education */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Skills - Increased Font and Block Size */}
              <section className="bg-gray-900/20 p-8 rounded-3xl border border-gray-800/40 h-full">
                <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
                  <h2 className="text-[11px] uppercase tracking-[0.3em] text-gray-400 font-black">
                    Core Expertise
                  </h2>
                  {showbutton && (
                    <button
                      onClick={() => {
                        router.push(`/suggestAi/${id}?section=skills`);
                      }}
                      className="text-[10px] text-cyan-400 hover:text-cyan-300 font-black tracking-widest transition-colors"
                    >
                      AI ASSIST
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills.length > 0 ? (
                    skills.map((s, index) => (
                      <span
                        key={index}
                        className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-100 font-semibold hover:bg-indigo-600/20 hover:border-indigo-500/50 transition-all cursor-default"
                      >
                        {s}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600 italic">
                      Listing skills...
                    </p>
                  )}
                </div>
              </section>

              {/* Education - Balanced Spacing */}
              <section className="bg-gray-900/20 p-8 rounded-3xl border border-gray-800/40 h-full">
                <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
                  <h2 className="text-[11px] uppercase tracking-[0.3em] text-gray-400 font-black">
                    Education
                  </h2>
                  {showbutton && (
                    <button
                      onClick={() => {
                        router.push(`/suggestAi/${id}?section=education`);
                      }}
                      className="text-[10px] text-cyan-400 hover:text-cyan-300 font-black tracking-widest transition-colors"
                    >
                      AI ASSIST
                    </button>
                  )}
                </div>
                <div className="text-base text-gray-300 leading-relaxed whitespace-pre-line border-l-4 border-indigo-500/30 pl-6 py-2">
                  {education || "Academic background details."}
                </div>
              </section>
            </div>
          </div>

          {/* Action Footer */}
          <footer className="mt-8 mb-12 text-center">
            <button
              onClick={() => router.push("/allResumes")}
              className="px-10 py-4 bg-white text-black font-black text-xs uppercase tracking-[0.3em] rounded-full hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-500/10"
            >
              Manage All Resumes
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Plus, Layout, ArrowRight, LogOut, Trash2 } from "lucide-react";
// import { useSession, signOut } from "next-auth/react";

// export default function Home({ resume }) {
//   const { data: session } = useSession();

//   const [name, setName] = useState("");
//   const [title, setTitle] = useState("");
//   const [aboutYourself, setAboutYourself] = useState("");
//   const [number, setNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [skill, setSkill] = useState("");
//   const [skills, setSkills] = useState([]);
//   const [education, setEducation] = useState("");
//   const [showbutton, setButton] = useState(false);
//   const [id, setId] = useState("");

//   const router = useRouter();

//   useEffect(() => {
//     if (!resume) return;

//     setName(resume.name || "");
//     setTitle(resume.title || "");
//     setEmail(resume.email || "");
//     setNumber(resume.number || "");
//     setSkills(resume.skills || []);
//     setEducation(resume.education || "");
//     setAboutYourself(resume.aboutYourself || "");
//     setId(resume._id);
//     setButton(true);
//   }, [resume]);

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch("/api/resume", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name,
//         title,
//         number,
//         email,
//         skills,
//         education,
//         aboutYourself,
//       }),
//     });

//     const result = await res.json();
//     if (result.success) {
//       router.push(`/Resumes/${result.user._id}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0b0f19] text-white px-4 lg:px-0">
//       {/* TOP ACTIONS */}
//       <div className="fixed top-4 right-4 z-50 flex gap-3">
//         <button
//           onClick={async () => {
//             await signOut({ redirect: false });
//             await fetch("/api/logout");
//             window.location.href = "/login";
//           }}
//           className="flex items-center gap-2 px-4 py-2 text-xs bg-gray-900/80 border border-gray-700 rounded-xl"
//         >
//           <LogOut size={14} /> Logout
//         </button>

//         <button
//           onClick={() => router.push("/Resumes")}
//           className="flex items-center gap-2 px-4 py-2 text-xs bg-gray-900/80 border border-gray-700 rounded-xl"
//         >
//           <Trash2 size={14} /> Clear
//         </button>
//       </div>

//       {/* MAIN LAYOUT */}
//       <div className="max-w-7xl mx-auto pt-24 pb-16 grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10">
//         {/* FORM */}
//         <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800">
//           <header className="mb-10">
//             <div className="flex items-center gap-3 mb-2">
//               <div className="p-2 bg-indigo-500 rounded-lg">
//                 <Layout size={22} />
//               </div>
//               <h1 className="text-xl font-bold">Portfolio Designer</h1>
//             </div>
//             <p className="text-gray-400 text-sm">
//               Update info to see live changes
//             </p>
//           </header>

//           <form onSubmit={onSubmit} className="space-y-8">
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Full Name"
//               className="w-full bg-[#161c2e] border border-gray-700 px-4 py-3 rounded-xl"
//               required
//             />

//             <input
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Job Title"
//               className="w-full bg-[#161c2e] border border-gray-700 px-4 py-3 rounded-xl"
//               required
//             />

//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               className="w-full bg-[#161c2e] border border-gray-700 px-4 py-3 rounded-xl"
//               required
//             />

//             <input
//               value={number}
//               onChange={(e) => setNumber(e.target.value)}
//               placeholder="Phone"
//               className="w-full bg-[#161c2e] border border-gray-700 px-4 py-3 rounded-xl"
//               required
//             />

//             <div className="flex gap-2">
//               <input
//                 value={skill}
//                 onChange={(e) => setSkill(e.target.value)}
//                 placeholder="Add skill"
//                 className="flex-1 bg-[#161c2e] border border-gray-700 px-4 py-3 rounded-xl"
//               />
//               <button
//                 type="button"
//                 onClick={() => {
//                   if (!skill.trim()) return;
//                   setSkills([...skills, skill]);
//                   setSkill("");
//                 }}
//                 className="bg-gray-800 px-4 rounded-xl"
//               >
//                 <Plus />
//               </button>
//             </div>

//             <textarea
//               value={education}
//               onChange={(e) => setEducation(e.target.value)}
//               placeholder="Education"
//               rows={3}
//               className="w-full bg-[#161c2e] border border-gray-700 px-4 py-3 rounded-xl"
//               required
//             />

//             <textarea
//               value={aboutYourself}
//               onChange={(e) => setAboutYourself(e.target.value)}
//               placeholder="About you"
//               rows={4}
//               className="w-full bg-[#161c2e] border border-gray-700 px-4 py-3 rounded-xl"
//               required
//             />

//             <button
//               type="submit"
//               className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-xl font-bold flex items-center justify-center gap-2"
//             >
//               Save Resume <ArrowRight size={18} />
//             </button>
//           </form>
//         </div>

//         {/* LIVE PREVIEW — NOW VISIBLE ON MOBILE */}
//         <div className="bg-gradient-to-br from-gray-900/40 to-gray-950 border border-gray-800 rounded-3xl p-6 lg:p-10">
//           <header className="text-center space-y-4">
//             <h1 className="text-4xl lg:text-6xl font-black">
//               {name || "Your Name"}
//             </h1>
//             <p className="text-lg text-gray-400">
//               {title || "Professional Title"}
//             </p>

//             <p className="text-sm text-gray-500">
//               {number || "Phone"} · {email || "Email"}
//             </p>
//           </header>

//           <section className="mt-10 space-y-8">
//             <div>
//               <h3 className="text-xs uppercase tracking-widest text-indigo-400 mb-2">
//                 Biography
//               </h3>
//               <p className="text-gray-300 italic">
//                 {aboutYourself || "Your professional summary appears here."}
//               </p>
//             </div>

//             <div>
//               <h3 className="text-xs uppercase tracking-widest text-indigo-400 mb-3">
//                 Skills
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {skills.length ? (
//                   skills.map((s, i) => (
//                     <span
//                       key={i}
//                       className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm"
//                     >
//                       {s}
//                     </span>
//                   ))
//                 ) : (
//                   <p className="text-gray-600 italic">No skills added</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <h3 className="text-xs uppercase tracking-widest text-indigo-400 mb-2">
//                 Education
//               </h3>
//               <p className="text-gray-300 whitespace-pre-line">
//                 {education || "Education details"}
//               </p>
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }
