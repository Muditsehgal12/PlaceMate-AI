const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-slate-300">{subtitle}</p>}
    </div>
  );
};

export default PageHeader;
