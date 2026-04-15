import { useState } from "react";
import PageHeader from "../components/PageHeader";
import api from "../services/api";

const ResumeAnalyzerPage = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      const response = await api.post("/ai/resume-analyzer", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
      localStorage.setItem("resumeScore", response.data.score);
    } catch (err) {
      setError(err.response?.data?.message || "Could not analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Resume Analyzer"
        subtitle="Upload your resume (PDF/DOC/DOCX) and get structured feedback instantly."
      />
      <form onSubmit={handleAnalyze} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
        <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-slate-300">
          Upload resume file
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="input-modern"
          onChange={(e) => setResumeFile(e.target.files[0])}
          required
        />
        {resumeFile && (
          <p className="mt-2 text-sm text-indigo-200">Selected: {resumeFile.name}</p>
        )}
        <button disabled={loading} className="btn-primary mt-4">
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>

      {error && (
        <p className="mt-3 rounded-xl border border-rose-400/40 bg-rose-500/20 p-2 text-sm text-rose-100">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-4 rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-300">File: {result.fileName}</p>
          <p className="mt-2 text-2xl font-semibold text-white">Resume Score: {result.score}/100</p>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3">
              <p className="mb-2 text-sm font-semibold text-emerald-200">Strengths</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-emerald-100">
                {result.strengths?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-3">
              <p className="mb-2 text-sm font-semibold text-amber-200">Weaknesses</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-amber-100">
                {result.weaknesses?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-indigo-400/30 bg-indigo-500/10 p-3">
              <p className="mb-2 text-sm font-semibold text-indigo-200">Suggestions</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-indigo-100">
                {result.suggestions?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzerPage;
