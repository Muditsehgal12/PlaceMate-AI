const StatCard = ({ title, value, accent }) => {
  return (
    <div className={`stat-card ${accent || ""}`}>
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
};

export default StatCard;
