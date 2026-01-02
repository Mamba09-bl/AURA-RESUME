"use client";

export default function suggestClient({ resume }) {
  return (
    <div className="min-h-screen bg-[#030814] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 p-10 rounded-2xl shadow-2xl border border-gray-800">
        {/* Header */}
        <div className="border-b border-gray-800 pb-6 mb-6">
          <h1 className="text-3xl font-bold uppercase tracking-wide text-white">
            {resume.name}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">{resume.title}</p>
          <p className="text-gray-400 text-sm mt-1">{resume.email}</p>
          <p className="text-gray-400 text-sm mt-1">{resume.number}</p>
        </div>
      </div>
    </div>
  );
}
