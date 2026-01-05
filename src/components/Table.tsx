"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGetRecruitmentsQuery } from "@/store/recruitmentsApi";
import { Eye, Edit, Trash2, Archive, Download, HelpCircle, ChevronDown } from "lucide-react";
import type { Recruitment } from "@/types/types";

const STATUS_OPTIONS: Recruitment["status"][] = [
  "In Progress",
  "Completed",
  "Draft",
  "Archived",
];

type Tab = "Active" | "Archived" | "Draft";

import { useRouter } from "next/navigation";

const Table = () => {
  const router = useRouter();
  const { data: rows, isLoading, error } = useGetRecruitmentsQuery();
  const [localRows, setLocalRows] = useState<Recruitment[]>([]);
  const [openStatusRowId, setOpenStatusRowId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("Active");
  const PAGE_SIZE = 7;

  // Initialize from localStorage if present *and non-empty*; otherwise fall back to server data
  useEffect(() => {
    const persisted = localStorage.getItem("recruitments_data");
    if (persisted) {
      try {
        const parsed = JSON.parse(persisted) as Recruitment[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLocalRows(parsed);
          return;
        }
      } catch (e) {
        console.warn("Failed to parse persisted recruitments", e);
      }
    }

    if (rows) setLocalRows(rows);
  }, [rows]);

  // Persist local changes so they survive reloads
  useEffect(() => {
    try {
      localStorage.setItem("recruitments_data", JSON.stringify(localRows));
    } catch (e) {
      console.warn("Failed to persist recruitments", e);
    }
  }, [localRows]);

  // Filter rows based on active tab
  const filteredRows = useMemo(() => {
    if (activeTab === "Archived") return localRows.filter((r) => r.status === "Archived");
    if (activeTab === "Draft") return localRows.filter((r) => r.status === "Draft");
    // Active: everything that's not archived or draft
    return localRows.filter((r) => r.status !== "Archived" && r.status !== "Draft");
  }, [localRows, activeTab]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE)), [filteredRows.length]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const displayedRows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredRows.slice(start, start + PAGE_SIZE);
  }, [filteredRows, page]);

  function changeStatus(id: string, status: Recruitment["status"]) {
    setLocalRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    setOpenStatusRowId(null);
  }

  function handleArchive(id: string) {
    if (!confirm("Archive this recruitment?")) return;
    setLocalRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Archived" } : r)));
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this recruitment?")) return;
    setLocalRows((prev) => prev.filter((r) => r.id !== id));
  }

  function handleEdit(id: string) {
    const r = localRows.find((x) => x.id === id);
    if (!r) return;
    const newName = prompt("Edit recruitment name:", r.recruitmentName);
    if (newName) setLocalRows((prev) => prev.map((x) => (x.id === id ? { ...x, recruitmentName: newName } : x)));
  }

  function handleView(id: string) {
    const r = localRows.find((x) => x.id === id);
    alert(JSON.stringify(r, null, 2));
  }

  const handleDownload = (r: Recruitment) => {
    const blob = new Blob([JSON.stringify(r, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${r.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Use functional update so event-created recruits see latest state
  function handleCreate() {
    const name = prompt("New recruitment name:");
    if (!name) return;

    setLocalRows((prev) => {
      const maxNum = prev.reduce((max, r) => {
        const n = parseInt(r.id.replace(/[^0-9]/g, "")) || 0;
        return Math.max(max, n);
      }, 0);
      const newId = `RID-${String(maxNum + 1).padStart(3, "0")}`;
      const newRec: Recruitment = {
        id: newId,
        recruitmentName: name,
        candidates: 0,
        startDate: new Date().toISOString().split("T")[0],
        status: "In Progress",
      };
      return [newRec, ...prev];
    });

    setActiveTab("Active");
    setPage(1);
  }



  if (isLoading && localRows.length === 0)
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-slate-600">
          <svg className="w-8 h-8 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"></path>
          </svg>
          <div>Loading recruitments…</div>
        </div>
      </div>
    );

  if (error) return <div className="p-6">Failed to load recruitments.</div>;


  return (
    <div className="p-6 bg-white rounded-md border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4 relative">
          <div className="absolute left-0 -top-2 h-10 w-1 bg-slate-800 rounded-sm" />
          <div className="flex gap-2 bg-white rounded-t-md px-1">
            <button
              className={`px-4 py-3 text-sm font-semibold rounded-t-md border-b-2 ${activeTab === "Active" ? "text-slate-900 border-b-slate-800" : "text-slate-500 border-transparent"}`}
              onClick={() => { setActiveTab("Active"); setPage(1); }}
            >
              Active
            </button>

            <button
              className={`px-4 py-3 text-sm font-semibold rounded-t-md border-b-2 ${activeTab === "Archived" ? "text-slate-900 border-b-slate-800" : "text-slate-500 border-transparent"}`}
              onClick={() => { setActiveTab("Archived"); setPage(1); }}
            >
              Archive
            </button>

            <button
              className={`px-4 py-3 text-sm font-semibold rounded-t-md border-b-2 ${activeTab === "Draft" ? "text-slate-900 border-b-slate-800" : "text-slate-500 border-transparent"}`}
              onClick={() => { setActiveTab("Draft"); setPage(1); }}
            >
              Draft
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="hidden md:inline-flex h-11 px-5 rounded-md bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 items-center gap-2 shadow-md"
            onClick={() => router.push('/create')}
          >
            <span className="text-sm">Create New Recruitment</span>
          </button>
        </div>        </div>
      {/* Constrain the table height so it won't outgrow the sidebar; body scrolls */}
      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {isLoading && new Array(Math.min(PAGE_SIZE, 3)).fill(0).map((_, i) => (
          <div key={i} className="animate-pulse bg-white p-3 rounded shadow-sm">
            <div className="h-4 bg-slate-200 rounded w-1/3 mb-2" />
            <div className="h-3 bg-slate-200 rounded w-2/3 mb-2" />
            <div className="h-3 bg-slate-200 rounded w-1/2" />
          </div>
        ))}

        {displayedRows.map((row) => (
          <div key={row.id} className="bg-white p-3 rounded shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-xs text-slate-500">{row.id}</div>
                <div className="text-sm font-semibold text-slate-800">{row.recruitmentName}</div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-1 rounded hover:bg-slate-100 text-slate-700" onClick={() => handleArchive(row.id)} title="Archive">
                  <Archive className="w-4 h-4" />
                </button>

                <button className="p-1 rounded hover:bg-slate-100 text-emerald-500" onClick={() => handleDownload(row)} title="Download">
                  <Download className="w-4 h-4" />
                </button>

                <button className="p-1 rounded hover:bg-slate-100 text-rose-500" onClick={() => handleDelete(row.id)} title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>

                <button className="p-1 rounded hover:bg-slate-100 text-slate-700" onClick={() => handleEdit(row.id)} title="Edit">
                  <Edit className="w-4 h-4" />
                </button>

                <button className="p-1 rounded hover:bg-slate-100 text-slate-700" onClick={() => handleView(row.id)} title="View">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">Status: <span className="font-semibold">{row.status}</span></div>
              <div className="text-sm text-slate-500">Candidates: {row.candidates}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-auto max-h-[calc(100vh-18rem)]">
        <table className="min-w-full table-auto border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-sm text-slate-600 border-b">
              <th className="pl-6 w-44 py-4">ID</th>
              <th className="py-4">Recruitment Name</th>
              <th className="w-36 text-center py-4 hidden md:table-cell">Candidates No.</th>
              <th className="w-44 text-center py-4 hidden md:table-cell">Start Date</th>
              <th className="w-44 text-center py-4">Status</th>
              <th className="w-40 text-center py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading &&
              new Array(PAGE_SIZE).fill(0).map((_, i) => (
                <tr key={i} className="bg-white border-b h-14 animate-pulse">
                  <td className="pl-6" />
                  <td />
                  <td className="hidden md:table-cell" />
                  <td className="hidden md:table-cell" />
                  <td />
                  <td />
                </tr>
              ))}

            {displayedRows.map((row, idx) => (
              <tr
                key={row.id}
                className={`h-14 ${idx % 2 === 0 ? "bg-slate-50" : "bg-white"} border-b hover:shadow-sm`}
              >
                <td className="pl-6 py-4 text-sm font-medium text-slate-700">{row.id}</td>
                <td className="py-4 text-sm text-slate-700">{row.recruitmentName}</td>
                <td className="py-4 text-sm text-slate-600 text-center hidden md:table-cell">{row.candidates}</td>
                <td className="py-4 text-sm text-slate-600 text-center hidden md:table-cell">{new Date(row.startDate).toLocaleDateString("en-GB")}</td>
                <td className="py-4 text-center relative">
                  <button
                    className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-white border ${row.status === "In Progress" ? "text-emerald-600 border-emerald-100" : "text-slate-600 border-slate-100"}`}
                    onClick={() => setOpenStatusRowId(openStatusRowId === row.id ? null : row.id)}
                  >
                    {row.status}
                    <svg className="w-3 h-3 ml-2 text-slate-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {openStatusRowId === row.id && (
                    <ul className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 bg-white rounded-md shadow-lg border z-20">
                      {STATUS_OPTIONS.map((opt) => (
                        <li
                          key={opt}
                          className={`px-3 py-2 text-sm cursor-pointer hover:bg-slate-50 ${opt === row.status ? "font-semibold" : ""}`}
                          onClick={() => changeStatus(row.id, opt)}
                        >
                          {opt}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="py-4 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <button className="p-1 rounded hover:bg-slate-100 text-slate-700" onClick={() => handleArchive(row.id)} title="Archive">
                      <Archive className="w-4 h-4" />
                    </button>

                    <button className="p-1 rounded hover:bg-slate-100 text-rose-500" onClick={() => handleDelete(row.id)} title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button className="p-1 rounded hover:bg-slate-100 text-slate-700" onClick={() => handleEdit(row.id)} title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>

                    <button className="p-1 rounded hover:bg-slate-100 text-slate-700" onClick={() => handleView(row.id)} title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <div>Showing {filteredRows.length} recruitments</div>

        <div className="flex items-center gap-3">
          <button className="px-3 py-1 rounded-md border" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>

          <div className="px-3 py-1 bg-white rounded border shadow-sm flex items-center gap-2">
            <input
              className="w-12 text-center text-sm outline-none"
              type="number"
              min={1}
              max={totalPages}
              value={page}
              onChange={(e) => {
                const v = Number(e.target.value || 1);
                if (Number.isNaN(v)) return;
                setPage(Math.max(1, Math.min(totalPages, Math.floor(v))));
              }}
            />
            <span>/</span>
            <span>{totalPages}</span>
          </div>

          <button className="px-3 py-1 rounded-md border" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};



// --- CreateForm component (local to Table) ---
function CreateForm({ onCancel, onSave }: { onCancel?: () => void; onSave: (values: { recruitmentName: string; jobRole: string; level: string; otherRole?: string; description?: string }) => void; }) {
  const [recruitmentName, setRecruitmentName] = useState("");
  const [jobRole, setJobRole] = useState("Other");
  const [level, setLevel] = useState("");
  const [otherRole, setOtherRole] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!recruitmentName.trim()) {
      setError("Recruitment name is required");
      return;
    }
    setError("");

    onSave({ recruitmentName: recruitmentName.trim(), jobRole, level, otherRole: otherRole.trim(), description: description.trim() });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Recruitment Name</label>
        <input value={recruitmentName} onChange={(e) => setRecruitmentName(e.target.value)} className="w-full px-3 py-2 rounded border text-sm" placeholder="Enter name of your Recruitment" />
        {error && <div className="text-rose-500 text-sm mt-1">{error}</div>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Job Role</label>
          <select value={jobRole} onChange={(e) => setJobRole(e.target.value)} className="w-full px-3 py-2 rounded border text-sm">
            <option>Other</option>
            <option>UI/UX Designer</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Data Scientist</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Select level of employee</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full px-3 py-2 rounded border text-sm">
            <option value="">Select level</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
      </div>

      {jobRole === "Other" && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Other</label>
          <input value={otherRole} onChange={(e) => setOtherRole(e.target.value)} className="w-full px-3 py-2 rounded border text-sm" placeholder="Other role" />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 rounded border text-sm h-32" placeholder="Write description here" />
      </div>

      <div className="flex items-center gap-3 justify-end">
        <button type="button" onClick={() => onCancel && onCancel()} className="px-4 py-2 rounded border text-slate-700">Cancel</button>
        <button type="submit" className="px-4 py-2 rounded bg-emerald-500 text-white">Save & Continue</button>
      </div>
    </form>
  );
}

export default Table;
