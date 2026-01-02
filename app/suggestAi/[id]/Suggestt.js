"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function suggestClient({ resume }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const section = searchParams.get("section");

  const [edu, setEdu] = useState("");
  const [apply, setApply] = useState(false);
  const [id, setId] = useState("");
  const [appliedContent, setAppliedContent] = useState("");
  const [history, setHistory] = useState([]);
  const [undo, setUndo] = useState(false);
  const [edit, setEdit] = useState(false);
  const [changeValue, setChangeValue] = useState("");
  const [doneEdit, setDone] = useState(false);
  const [showEdit, setShowEdit] = useState("");
  const [compEdit, setCompEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const content =
    section === "education"
      ? resume.education
      : section === "skills"
      ? resume.skills?.join(", ")
      : resume.aboutYourself;

  async function improveEducation() {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, content }),
    });

    setId(resume._id);
    const data = await res.json();
    console.log("i am data", data);
    if (data.message === "reached limited") {
      router.push("/LimitedReached");
      return;
    }
    setEdu(data.user);
    setLoading(false);
  }

  useEffect(() => {
    improveEducation();

    console.log("i am the content", content);
    console.log(edu);
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030814]">
        <p className="text-gray-400 text-sm">Checking usage limit...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030814] px-6 py-10 flex flex-col items-center">
      {/* MAIN PANELS */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT */}

        <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 p-8 rounded-2xl border border-gray-800 shadow-xl">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs uppercase tracking-widest text-indigo-400">
              {apply ? "Improved Text of AI has Applied" : "User Output"}
            </h2>

            {apply && (
              <button
                onClick={() => {
                  console.log("hello world", edu);
                  setChangeValue(edu);
                  setEdit(true);
                  setApply(false);
                  improveEducation();
                }}
                className="px-3 py-1 text-xs rounded-md border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 transition"
              >
                Edit
              </button>
            )}
          </div>

          {/* CONTENT */}
          <div className="text-sm text-gray-300 whitespace-pre-line leading-relaxed">
            {apply
              ? edu
              : edit
              ? changeValue
              : compEdit
              ? showEdit
              : content || "Generating AI response..."}
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 p-8 rounded-2xl border border-gray-800">
          <h2 className="text-sm uppercase tracking-widest text-indigo-400 mb-4">
            {apply ? "Old Text" : "AI OUTPUT"}
          </h2>
          <p className="text-sm text-gray-300 whitespace-pre-line">
            {apply ? content : edu || "Generating AI response..."}
          </p>
        </div>
      </div>

      {/* {apply && setAppliedContent(content)} */}

      {/*.......... last .............*/}
      {apply && (
        <div className="mt-8 w-full max-w-6xl bg-gray-900/60 border border-dashed border-gray-700 rounded-xl p-6">
          <h2 className="text-xs uppercase tracking-widest text-yellow-400 mb-3">
            Previous Version (User Text)
          </h2>

          <div className="text-sm text-gray-400 whitespace-pre-line leading-relaxed max-h-64 overflow-y-auto">
            {history[0]?.text || "No previous version available."}
          </div>
        </div>
      )}

      {edit && (
        <div className="mt-8 w-full max-w-6xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xs uppercase tracking-widest text-yellow-400 mb-3">
            Manual Edit
          </h2>

          <textarea
            value={changeValue}
            onChange={(e) => setChangeValue(e.target.value)}
            className="w-full min-h-[200px] bg-gray-900 text-gray-200 text-sm rounded-lg p-4 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            placeholder="Start editing the AI text..."
          />

          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={() => {
                setEdit(false);
                setApply(true);
              }}
              className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
            >
              Cancel
            </button>

            <button
              onClick={async () => {
                setEdit(false);

                const res = await fetch(`/api/EditAi/${resume._id}`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ content, changeValue, section }),
                });

                const result = await res.json();

                if (section === "education") {
                  setShowEdit(result.user.education || "");
                } else if (section === "skills") {
                  setShowEdit(result.all.skills || "");
                } else if (section === "aboutYourself") {
                  setShowEdit(result.all.aboutYourself || "");
                }

                setCompEdit(true);
              }}
              className="px-5 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow hover:opacity-90 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <button
          onClick={async () => {
            const res = await fetch(`/api/UpdatedAi/${resume._id}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ edu, section, content }),
            });
            const result = await res.json();
            // console.log("i am skills res", res);
            console.log("i am ai response", edu);

            setApply(true);

            {
              if (section === "education") {
                setHistory(result.all.educationHistory || []);
              } else if (section === "skills") {
                setHistory(result.all.skillsHistory || []);
              } else if (section === "aboutYourself") {
                setHistory(result.all.aboutYourselfHistory || []);
              }
            }
          }}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow hover:opacity-90 transition"
        >
          Apply Changes
        </button>

        <button
          onClick={async () => {
            // const res = await fetch(`/api/UpdatedAi/${resume._id}`, {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify({ edu, section, content }),
            // });
            // const result = await res.json();
            setUndo(true);

            const res = await fetch(`/api/UpdatedAi/${resume._id}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ edu, section, content }),
            });
            const result = await res.json();

            setUndo();
            setApply(false);
          }}
          className="px-6 py-2 rounded-lg bg-gray-700 text-white font-semibold shadow hover:bg-gray-600 transition"
        >
          Undo
        </button>
      </div>

      {/* NAVIGATION */}
      <div className="mt-12 flex flex-wrap gap-5 justify-center">
        <button
          onClick={() => router.push("/Resumes")}
          className="
      px-6 py-3 text-sm font-semibold rounded-xl
      border border-gray-700 text-gray-300
      bg-white/5 backdrop-blur
      hover:bg-indigo-500/10 hover:border-indigo-400/40 hover:text-indigo-300
      transition-all duration-300 shadow-sm
    "
        >
          + Create New Resume
        </button>

        <button
          onClick={() => router.push("/allResumes")}
          className="
      px-6 py-3 text-sm font-semibold rounded-xl
      border border-gray-700 text-gray-300
      bg-white/5 backdrop-blur
      hover:bg-cyan-500/10 hover:border-cyan-400/40 hover:text-cyan-300
      transition-all duration-300 shadow-sm
    "
        >
          View All Resumes
        </button>

        <button
          onClick={() => router.push(`/Resumes/${id}`)}
          className="
      px-7 py-3 text-sm font-black uppercase tracking-wider
      rounded-xl text-red-200
      bg-red-500/15 border border-red-400/40
      shadow-lg shadow-red-500/20
      hover:bg-red-500/25 hover:text-white hover:shadow-red-500/40
      transition-all duration-300
      active:scale-95
    "
        >
          Back to Resume
        </button>
      </div>
    </div>
  );
}
