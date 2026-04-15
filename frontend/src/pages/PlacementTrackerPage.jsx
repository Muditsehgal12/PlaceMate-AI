import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import api from "../services/api";

const statusOptions = ["All", "Applied", "Interview", "Selected", "Rejected"];

const PlacementTrackerPage = () => {
  const [placements, setPlacements] = useState([]);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
  });
  const [editId, setEditId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [error, setError] = useState("");

  const fetchPlacements = async (selectedStatus = statusFilter) => {
    try {
      const query = selectedStatus !== "All" ? `?status=${selectedStatus}` : "";
      const response = await api.get(`/placements${query}`);
      setPlacements(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not fetch placements.");
    }
  };

  useEffect(() => {
    fetchPlacements(statusFilter);
  }, [statusFilter]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editId) {
        await api.put(`/placements/${editId}`, formData);
      } else {
        await api.post("/placements", formData);
      }
      setEditId(null);
      setFormData({ company: "", role: "", status: "Applied" });
      fetchPlacements(statusFilter);
    } catch (err) {
      setError(err.response?.data?.message || "Could not save placement.");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
      company: item.company,
      role: item.role,
      status: item.status,
    });
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await api.delete(`/placements/${id}`);
      fetchPlacements(statusFilter);
      if (editId === id) {
        setEditId(null);
        setFormData({ company: "", role: "", status: "Applied" });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete placement.");
    }
  };

  return (
    <div>
      <PageHeader
        title="Placement Tracker"
        subtitle="Add, edit, and filter your applications with status-wise visibility."
      />

      {error && (
        <p className="mb-3 rounded-xl border border-rose-400/40 bg-rose-500/20 p-2 text-sm text-rose-100">
          {error}
        </p>
      )}

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <label className="mb-1 block text-xs uppercase tracking-[0.15em] text-slate-300">
            Filter by status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-modern"
          >
            {statusOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-6 grid gap-3 rounded-2xl border border-slate-700 bg-slate-900/60 p-4 md:grid-cols-4">
        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          className="input-modern"
          required
        />
        <input
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Role"
          className="input-modern"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="input-modern"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Selected</option>
          <option>Rejected</option>
        </select>
        <div className="flex gap-2">
          <button className="btn-primary w-full">{editId ? "Update" : "Add"}</button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setFormData({ company: "", role: "", status: "Applied" });
              }}
              className="btn-secondary w-full"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900/60">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800/70 text-slate-200">
            <tr>
              <th className="p-3">Company</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {placements.map((item) => (
              <tr key={item._id} className="border-t border-slate-800 text-slate-100">
                <td className="p-3">{item.company}</td>
                <td className="p-3">{item.role}</td>
                <td className="p-3">
                  <span className="rounded-full border border-indigo-300/40 bg-indigo-500/10 px-2 py-1 text-xs">
                    {item.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="btn-secondary py-1 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item._id)}
                      className="rounded-xl border border-rose-300/40 bg-rose-500/20 px-3 py-1 text-xs text-rose-100 transition hover:bg-rose-500/35"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {placements.length === 0 && (
              <tr>
                <td colSpan="4" className="p-3 text-center text-slate-400">
                  No placements yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlacementTrackerPage;
