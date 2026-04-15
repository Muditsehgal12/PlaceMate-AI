import { useState } from "react";
import PageHeader from "../components/PageHeader";
import api from "../services/api";

const MockInterviewPage = () => {
  const [role, setRole] = useState("Software Engineer");
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  const getQuestions = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.get(`/ai/mock-questions?role=${encodeURIComponent(role)}`);
      setQuestions(response.data.questions);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load questions.");
    }
  };

  return (
    <div>
      <PageHeader
        title="Mock Interview Questions"
        subtitle="Generate role-based realistic questions every time to practice better."
      />

      <form
        onSubmit={getQuestions}
        className="mb-4 flex flex-col gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 p-4 sm:flex-row"
      >
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Enter target role"
          className="input-modern"
        />
        <button className="btn-primary">
          Generate Questions
        </button>
      </form>

      {error && (
        <p className="mb-3 rounded-xl border border-rose-400/40 bg-rose-500/20 p-2 text-sm text-rose-100">
          {error}
        </p>
      )}

      <ol className="space-y-3">
        {questions.map((question, index) => (
          <li
            key={`${index}-${question}`}
            className="rounded-2xl border border-slate-700 bg-slate-900/60 p-3 text-slate-100"
          >
            {question}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MockInterviewPage;
