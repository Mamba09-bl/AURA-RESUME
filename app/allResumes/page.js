"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ChevronRight, Crown, Sparkles } from "lucide-react";

export default function AllResumesPage() {
  const [resumes, setResumes] = useState([]);
  const [details, setDetails] = useState([]);
  const [block, setBlock] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchResumes() {
      const res = await fetch("/api/resume");
      const data = await res.json();
      console.log("i am the datatatat", data);

      if (data.isPaid == false) {
        setBlock(true);
      }

      // if API returns { user: [...] }
      setResumes(data.chatUser || []);
    }

    fetchResumes();
  }, []);

  return (
    <div className="min-h-screen bg-[#030814] bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#030814] to-[#030814] text-white p-8 md:p-16 font-sans">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
            <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-[0.2em]">
              Database
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Document{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              Library
            </span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            Manage and refine your professional profiles.
          </p>
        </div>

        <a
          href="/Resumes"
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-cyan-400 transition-all transform hover:-translate-y-1 shadow-xl shadow-cyan-500/10"
        >
          + Create New
        </a>
      </div>

      {/* Grid Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.length > 0 ? (
          resumes.map((resume) => (
            <div
              key={resume._id}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl transition-all duration-500 hover:border-indigo-500/50 hover:bg-white/[0.07] overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-3xl blur opacity-0 group-hover:opacity-10 transition duration-500"></div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-indigo-400 font-bold">
                    {resume.name.charAt(0)}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  {resume.name}
                </h2>
                <p className="text-sm text-gray-400 font-medium mb-8 leading-relaxed">
                  {resume.title}
                </p>

                {/* View Details */}
                <button
                  onClick={() => {
                    router.push(`/showDetails/${resume._id}`);
                  }}
                  className="w-full py-3 mb-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all flex items-center justify-center gap-2"
                >
                  View Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>

                {block && (
                  <button
                    onClick={() => router.push("/LimitedReached")}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-600/10 border border-amber-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-amber-500/80 hover:from-amber-500/20 hover:to-orange-600/20 hover:text-amber-400 hover:border-amber-500/40 transition-all flex items-center justify-center gap-2"
                  >
                    <Crown className="w-3 h-3 mb-0.5" />
                    <span>Unlock Premium Optimization</span>
                  </button>
                )}
                {/* Optimization Button (Styled Differently) */}
                {!block && (
                  <button
                    onClick={() => {
                      router.push(`/optimization/${resume._id}`);
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-400/30 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300 hover:from-cyan-500 hover:to-indigo-500 hover:text-white hover:border-indigo-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                  >
                    Optimize Resume
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                )}
                {/* <button
                  onClick={() => {
                    router.push(`/optimization/${resume._id}`);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-400/30 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300 hover:from-cyan-500 hover:to-indigo-500 hover:text-white hover:border-indigo-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                >
                  Optimize Resume
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button> */}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
            <p className="text-gray-600 font-medium italic">
              No resumes found in the cloud.
            </p>
          </div>
        )}
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed bottom-0 left-0 w-full h-1/2 pointer-events-none bg-gradient-to-t from-indigo-950/10 to-transparent -z-10"></div>
    </div>
  );
}

// "use client";
// import React, { useEffect, useState } from "react";
// useEffect(() => {
//     async function fetchResumes() {
//       const res = await fetch("/api/resume");
//       const data = await res.json();

//       // if API returns { user: [...] }
//       setResumes(data.chatUser || []);
//     }

//     fetchResumes();
//   }, []);

// export default function App() {
//   const [resumes, setResumes] = useState([]);
//   const [details, setDetails] = useState([]); // Kept for logic consistency
//   const router = useRouter();

//   return (
//     <div className="min-h-screen bg-[#030814] bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#030814] to-[#030814] text-white p-8 md:p-16 font-sans">
//       {/* Header Section */}
//       <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
//         <div>
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
//             <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-[0.2em]">
//               Database
//             </p>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-black tracking-tight">
//             Document{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
//               Library
//             </span>
//           </h1>
//           <p className="text-gray-500 mt-2 text-sm font-medium">
//             Manage and refine your professional profiles.
//           </p>
//         </div>

//         <a
//           href="/Resumes"
//           onClick={() => router.push("/")}
//           className="px-6 py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-cyan-400 transition-all transform hover:-translate-y-1 shadow-xl shadow-cyan-500/10"
//         >
//           + Create New
//         </a>
//       </div>

//       {/* Grid Layout */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {resumes.length > 0 ? (
//           resumes.map((resume) => (
//             <div
//               key={resume._id}
//               className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl transition-all duration-500 hover:border-indigo-500/50 hover:bg-white/[0.07] overflow-hidden"
//             >
//               {/* Subtle background glow on hover */}
//               <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-3xl blur opacity-0 group-hover:opacity-10 transition duration-500"></div>

//               <div className="relative z-10">
//                 <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
//                   <span className="text-indigo-400 font-bold">
//                     {resume.name.charAt(0)}
//                   </span>
//                 </div>

//                 <h2 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
//                   {resume.name}
//                 </h2>
//                 <p className="text-sm text-gray-400 font-medium mb-8 leading-relaxed">
//                   {resume.title}
//                 </p>

//                 <button
//                   onClick={() => {
//                     router.push(`/showDetails/${resume._id}`);
//                     console.log("hello");
//                   }}
//                   className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all flex items-center justify-center gap-2"
//                 >
//                   View Details
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="12"
//                     height="12"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="3"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M5 12h14" />
//                     <path d="m12 5 7 7-7 7" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           // Skeleton / Empty State
//           <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
//             <p className="text-gray-600 font-medium italic">
//               No resumes found in the cloud.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Background Decorative Elements */}
//       <div className="fixed bottom-0 left-0 w-full h-1/2 pointer-events-none bg-gradient-to-t from-indigo-950/10 to-transparent -z-10"></div>
//     </div>
//   );
// }
