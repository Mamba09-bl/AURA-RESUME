import React from "react";
import { Mail, Phone, GraduationCap, User, Wrench, MapPin } from "lucide-react";

/**
 * Reusable Resume Details Component
 * Expects `resume` as a prop (from DB / API)
 */
export default function DetailsClient({ resume }) {
  if (!resume) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        No resume data found.
      </div>
    );
  }
  function extractSkills(raw) {
    if (!raw) return [];

    // ✅ If already an array → return cleaned array
    if (Array.isArray(raw)) {
      return raw.map((s) => String(s).trim()).filter(Boolean);
    }

    // ✅ Force string for AI text
    const text = String(raw);

    const cleaned = text
      .replace(/\*\*/g, "")
      .replace(/\(Note:[^)]+\)/gi, "")
      .replace(/Technical Skills:/gi, "")
      .replace(/Programming Languages:/gi, "")
      .replace(/Frameworks:/gi, "")
      .replace(/Database Management:/gi, "")
      .replace(/API Development and Integration:/gi, "")
      .replace(/UI\/UX Design:/gi, "");

    return cleaned
      .split(/,|\n/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  const skills = extractSkills(resume.skills);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-5xl bg-slate-900 rounded-lg shadow-2xl border border-slate-800 overflow-hidden flex flex-col md:flex-row">
        {/* LEFT SIDEBAR */}
        <div className="w-full md:w-1/3 bg-slate-950/50 border-r border-slate-800 p-8 flex flex-col gap-8">
          {/* Mobile Header */}
          <div className="md:hidden">
            <h1 className="text-3xl font-bold text-white">{resume.name}</h1>
            <p className="text-blue-400 font-medium">{resume.title}</p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
              Contact Info
            </h3>

            <div className="space-y-4">
              <ContactItem
                icon={<Mail size={16} />}
                label="Email"
                value={resume.email}
              />
              <ContactItem
                icon={<Phone size={16} />}
                label="Phone"
                value={resume.number}
              />
              {/* <ContactItem
                icon={<MapPin size={16} />}
                label="Location"
                value="Remote / Worldwide"
              /> */}
            </div>
          </div>

          {/* Skills */}
          <div className="flex-grow">
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-indigo-400 mb-6 flex items-center gap-2">
              <Wrench size={14} />
              Technical Skills
            </h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-sm text-slate-200"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <span className="font-medium">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="w-full md:w-2/3 p-8 md:p-12 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900/50">
          {/* Desktop Header */}
          <div className="hidden md:block mb-10 pb-8 border-b border-slate-800">
            <h1 className="text-4xl font-extrabold text-white">
              {resume.name}
            </h1>
            <p className="text-xl text-blue-400">{resume.title}</p>
          </div>

          <div className="space-y-10">
            {/* About */}
            <section>
              <SectionHeader
                icon={<User size={20} />}
                title="Professional Profile"
              />
              <p className="text-slate-400 leading-relaxed">
                {resume.aboutYourself}
              </p>
            </section>

            {/* Education */}
            <section>
              <SectionHeader
                icon={<GraduationCap size={20} />}
                title="Education History"
              />
              <p className="text-slate-400 leading-relaxed">
                {resume.education}
              </p>
            </section>

            {/* Footer */}
            <div className="pt-8 mt-12 border-t border-slate-800 flex justify-between text-xs text-slate-600">
              <span>
                © {new Date().getFullYear()} {resume.name}
              </span>
              <span className="uppercase tracking-widest">Resume</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Helper Components ---------- */

function ContactItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 bg-slate-800 rounded-md text-blue-400">{icon}</div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm text-slate-200 break-all">{value}</p>
      </div>
    </div>
  );
}

function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="p-1.5 bg-blue-500/10 rounded text-blue-400">{icon}</div>
      <h2 className="text-xl font-bold text-slate-100">{title}</h2>
    </div>
  );
}

// import React from "react";
// import { Mail, Phone, GraduationCap, User, Wrench } from "lucide-react";

/**
 * Reusable Resume Details Component
 * Expects `resume` as a prop (from DB / API)
 *
 * STYLE UPDATE:
 * Restored dark background logic from original.
 * Updated Skills visualization to a modern bordered-accent style.
 */
// export default function DetailsClient({ resume }) {
//   // Logic: Handle missing data
//   if (!resume) {
//     return (
//       <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-medium">
//         No resume data found.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-950 py-8 px-4 font-sans flex justify-center items-start">
//       {/* Main Card Container */}
//       <div className="w-full max-w-5xl bg-slate-900 rounded-xl shadow-2xl border border-slate-800 overflow-hidden animate-in fade-in duration-500">
//         {/* HEADER SECTION */}
//         <div className="bg-slate-950 text-white p-8 md:p-12 relative overflow-hidden border-b border-slate-800">
//           {/* Decorative background element */}
//           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-10 -mr-16 -mt-16 pointer-events-none"></div>

//           <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
//             <div>
//               <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2 text-white">
//                 {resume.name}
//               </h1>
//               <p className="text-xl md:text-2xl text-blue-400 font-medium">
//                 {resume.title}
//               </p>
//             </div>

//             {/* Contact Info */}
//             <div className="flex flex-col gap-3 md:items-end">
//               <ContactPill icon={<Mail size={16} />} value={resume.email} />
//               <ContactPill icon={<Phone size={16} />} value={resume.number} />
//             </div>
//           </div>
//         </div>

//         {/* BODY CONTENT - Two Column Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:divide-x divide-slate-800">
//           {/* PRIMARY CONTENT (Left 2/3) */}
//           <div className="lg:col-span-2 p-8 md:p-12 space-y-12 bg-slate-900">
//             {/* About Section */}
//             <section className="group">
//               <SectionHeader
//                 icon={<User className="text-blue-400" size={24} />}
//                 title="Professional Profile"
//               />
//               <p className="text-slate-400 leading-relaxed text-lg mt-6 border-l-2 border-blue-500/50 pl-6">
//                 {resume.aboutYourself}
//               </p>
//             </section>

//             {/* Education Section */}
//             <section className="group">
//               <SectionHeader
//                 icon={<GraduationCap className="text-blue-400" size={24} />}
//                 title="Education History"
//               />
//               <div className="mt-6 bg-slate-950/50 rounded-lg p-6 border border-slate-800">
//                 <p className="text-slate-300 font-medium leading-relaxed">
//                   {resume.education}
//                 </p>
//               </div>
//             </section>
//           </div>

//           {/* SIDEBAR CONTENT (Right 1/3) */}
//           <div className="bg-slate-950/30 p-8 md:p-10 flex flex-col gap-8">
//             {/* Skills Section - New Visualization */}
//             <div>
//               <div className="flex items-center gap-3 mb-8">
//                 <Wrench className="text-blue-500" size={18} />
//                 <h3 className="font-bold text-slate-100 uppercase tracking-[0.2em] text-xs">
//                   Technical Expertise
//                 </h3>
//               </div>

//               <div className="space-y-3">
//                 {resume.skills?.map((skill, index) => (
//                   <div
//                     key={index}
//                     className="group flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all duration-300"
//                   >
//                     <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
//                       {skill}
//                     </span>
//                     <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Footer in Sidebar */}
//             <div className="mt-auto pt-8 border-t border-slate-800">
//               <p className="text-[10px] text-slate-500 font-mono tracking-widest text-center uppercase">
//                 © {new Date().getFullYear()} {resume.name}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------- Helper Components ---------- */

// function ContactPill({ icon, value }) {
//   if (!value) return null;
//   return (
//     <div className="flex items-center gap-3 text-slate-300 bg-slate-900/80 hover:bg-slate-800 px-4 py-2 rounded-lg transition-colors border border-slate-800">
//       <span className="text-blue-400">{icon}</span>
//       <span className="text-sm font-medium tracking-wide">{value}</span>
//     </div>
//   );
// }

// function SectionHeader({ icon, title }) {
//   return (
//     <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
//       <div className="p-2 bg-blue-500/10 rounded-lg">{icon}</div>
//       <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
//         {title}
//       </h2>
//     </div>
//   );
// }
