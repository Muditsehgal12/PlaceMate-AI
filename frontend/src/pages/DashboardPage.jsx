import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalApplications: 0,
    interviewsScheduled: 0,
    offersReceived: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/placements/stats");
        setStats(response.data);
      } catch (error) {
        // Keep default values when API is unreachable.
      }
    };
    fetchStats();
  }, []);

  const resumeScore = useMemo(() => Number(localStorage.getItem("resumeScore") || 0), []);

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user?.name || "Student"} 👋`}
        subtitle="PlaceMate AI - AI Placement & Career Readiness Platform"
      />

      <section className="mb-6 rounded-2xl border border-indigo-400/25 bg-gradient-to-r from-indigo-600/30 to-cyan-600/20 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-200">
          Career Progress Snapshot
        </p>
        <h3 className="mt-2 text-xl font-semibold text-white">
          Keep your momentum high this placement season.
        </h3>
        <p className="mt-1 text-sm text-indigo-100/90">
          Add your latest applications, refine your resume score, and practice role-based
          interview questions every day.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Applications"
          value={stats.totalApplications}
          accent="accent-indigo"
        />
        <StatCard
          title="Interviews Scheduled"
          value={stats.interviewsScheduled}
          accent="accent-cyan"
        />
        <StatCard title="Offers Received" value={stats.offersReceived} accent="accent-emerald" />
        <StatCard title="Resume Score" value={`${resumeScore}/100`} accent="accent-amber" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
          <p className="text-sm text-slate-400">Profile</p>
          <p className="mt-1 text-lg font-medium text-white">{user?.email}</p>
        </div>
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
          <p className="text-sm text-slate-400">Current Goal</p>
          <p className="mt-1 text-lg font-medium text-white">
            Convert interviews into final offers
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
