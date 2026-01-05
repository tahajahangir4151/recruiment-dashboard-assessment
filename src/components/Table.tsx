"use client";

import React, { useEffect, useState } from "react";
import { useGetRecruitmentsQuery } from "@/store/recruitmentsApi";
import { Edit, Trash2, Loader } from "lucide-react";
import type { Recruitment } from "@/types/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

const STATUS_OPTIONS: Recruitment["status"][] = [
  "In Progress",
  "Completed",
  "Draft",
  "Archived",
];

type Tab = "Active" | "Archived" | "Draft";

const Table = () => {
  const router = useRouter();
  const { data: apiRows, isLoading, error } = useGetRecruitmentsQuery();
  const [rows, setRows] = useState<Recruitment[]>([]);
  const [statusDropdown, setStatusDropdown] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("Active");
  const PAGE_SIZE = 7;

  useEffect(() => {
    const saved = localStorage.getItem("recruitments_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRows(parsed);
          return;
        }
      } catch {}
    }
    if (apiRows) setRows(apiRows);
  }, [apiRows]);

  useEffect(() => {
    localStorage.setItem("recruitments_data", JSON.stringify(rows));
  }, [rows]);

  const filteredRows = rows.filter((r) => {
    if (activeTab === "Archived") return r.status === "Archived";
    if (activeTab === "Draft") return r.status === "Draft";
    return r.status !== "Archived" && r.status !== "Draft";
  });

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const displayedRows = filteredRows.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const changeStatus = (id: string, status: Recruitment["status"]) => {
    setRows(rows.map((r) => (r.id === id ? { ...r, status } : r)));
    setStatusDropdown(null);
  };

  const handleArchive = (id: string) => {
    if (!confirm("Archive this recruitment?")) return;
    setRows(rows.map((r) => (r.id === id ? { ...r, status: "Archived" } : r)));
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this recruitment?")) return;
    setRows(rows.filter((r) => r.id !== id));
  };

  if (isLoading && rows.length === 0)
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-slate-600">
          <Loader />
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
            {(["Active", "Archived", "Draft"] as Tab[]).map((tab) => (
              <button
                key={tab}
                className={`px-4 py-3 text-sm font-semibold rounded-t-md border-b-2 ${
                  activeTab === tab
                    ? "text-slate-900 border-b-slate-800"
                    : "text-slate-500 border-transparent"
                }`}
                onClick={() => {
                  setActiveTab(tab);
                  setPage(1);
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="hidden md:inline-flex h-11 px-5 rounded-md bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 items-center gap-2 shadow-md"
            onClick={() => router.push("/create")}
          >
            <span className="text-sm">Create New Recruitment</span>
          </button>
        </div>
      </div>

      <div className="md:hidden space-y-3">
        {displayedRows.map((row) => (
          <div key={row.id} className="bg-white p-3 rounded shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-xs text-slate-500">{row.id}</div>
                <div className="text-sm font-semibold text-slate-800">
                  {row.recruitmentName}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="p-1 rounded hover:bg-slate-100 text-[#06BF97]"
                  onClick={() => handleArchive(row.id)}
                >
                  <Image
                    src="/archive.svg"
                    alt="Archive"
                    width={15}
                    height={15}
                  />
                </button>
                <button
                  className="p-1 rounded hover:bg-slate-100 text-rose-500"
                  onClick={() => handleDelete(row.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button className="p-1 rounded hover:bg-slate-100 text-slate-700">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Status: <span className="font-semibold">{row.status}</span>
              </div>
              <div className="text-sm text-slate-500">
                Candidates: {row.candidates}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block overflow-auto max-h-[calc(100vh-18rem)]">
        <table className="min-w-full table-auto border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-sm text-slate-600 border-b">
              <th className="pl-6 w-44 py-4">ID</th>
              <th className="py-4">Recruitment Name</th>
              <th className="w-36 text-center py-4 hidden md:table-cell">
                Candidates No.
              </th>
              <th className="w-44 text-center py-4 hidden md:table-cell">
                Start Date
              </th>
              <th className="w-44 text-center py-4">Status</th>
              <th className="w-40 text-center py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {displayedRows.map((row, idx) => (
              <tr
                key={row.id}
                className={`h-14 ${
                  idx % 2 === 0 ? "bg-slate-50" : "bg-white"
                } border-b hover:shadow-sm`}
              >
                <td className="pl-6 py-4 text-sm font-medium text-slate-700">
                  {row.id}
                </td>
                <td className="py-4 text-sm text-slate-700">
                  {row.recruitmentName}
                </td>
                <td className="py-4 text-sm text-slate-600 text-center hidden md:table-cell">
                  {row.candidates}
                </td>
                <td className="py-4 text-sm text-slate-600 text-center hidden md:table-cell">
                  {new Date(row.startDate).toLocaleDateString("en-US")}
                </td>
                <td className="py-4 text-center relative">
                  <button
                    className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-white border ${
                      row.status === "In Progress"
                        ? "text-emerald-600 border-emerald-100"
                        : "text-slate-600 border-slate-100"
                    }`}
                    onClick={() =>
                      setStatusDropdown(
                        statusDropdown === row.id ? null : row.id
                      )
                    }
                  >
                    {row.status}
                    <svg
                      className="w-3 h-3 ml-2 text-slate-400"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {statusDropdown === row.id && (
                    <ul className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 bg-white rounded-md shadow-lg border z-20">
                      {STATUS_OPTIONS.map((opt) => (
                        <li
                          key={opt}
                          className={`px-3 py-2 text-sm cursor-pointer hover:bg-slate-50 ${
                            opt === row.status ? "font-semibold" : ""
                          }`}
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
                    <button
                      className="p-1 rounded hover:bg-slate-100 text-[#06BF97]"
                      onClick={() => handleArchive(row.id)}
                    >
                      <Image
                        src="/archive.svg"
                        alt="Archive"
                        width={15}
                        height={15}
                      />
                    </button>
                    <button
                      className="p-1 rounded hover:bg-slate-100 text-rose-500"
                      onClick={() => handleDelete(row.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-1 rounded hover:bg-slate-100 text-slate-700">
                      <Edit className="w-4 h-4" />
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
          <button
            className="px-3 py-1 rounded-md border"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <div className="px-3 py-1 bg-white rounded border shadow-sm flex items-center gap-2">
            <input
              className="w-12 text-center text-sm outline-none"
              type="number"
              min={1}
              max={totalPages}
              value={page}
              onChange={(e) =>
                setPage(
                  Math.max(1, Math.min(totalPages, Number(e.target.value)))
                )
              }
            />
            <span>/</span>
            <span>{totalPages}</span>
          </div>
          <button
            className="px-3 py-1 rounded-md border"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
