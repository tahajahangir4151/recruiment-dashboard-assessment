"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import type { Recruitment } from "@/types/types";

export default function CreatePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  function handleSave(values: {
    recruitmentName: string;
    jobRole: string;
    level: string;
    otherRole?: string;
    description?: string;
  }) {
    console.log("Create (no-persist):", values);
    router.push("/");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          onOpenSidebar={() => setSidebarOpen(true)}
          title={"Create New Recruitment"}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-md border p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Create New Recruitment
            </h2>
            <CreateForm onSave={handleSave} />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

function CreateForm({
  onSave,
}: {
  onSave: (values: {
    recruitmentName: string;
    jobRole: string;
    level: string;
    otherRole?: string;
    description?: string;
  }) => void;
}) {
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
    onSave({
      recruitmentName: recruitmentName.trim(),
      jobRole,
      level,
      otherRole: otherRole.trim(),
      description: description.trim(),
    });
  }

  function handleCancel() {
    setRecruitmentName("");
    setJobRole("Other");
    setLevel("");
    setOtherRole("");
    setDescription("");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Job Role
          </label>
          <select
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="w-full px-3 py-2 rounded border text-sm"
          >
            <option>Other</option>
            <option>UI/UX Designer</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Data Scientist</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Select level of employee
          </label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full px-3 py-2 rounded border text-sm"
          >
            <option value="">Select level</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
      </div>

      {jobRole === "Other" && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Other
          </label>
          <input
            value={otherRole}
            onChange={(e) => setOtherRole(e.target.value)}
            className="w-full px-3 py-2 rounded border text-sm"
            placeholder="Other role"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm h-32"
          placeholder="Write description here"
        />
      </div>

      <div className="flex items-center gap-3 justify-end">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 rounded border text-slate-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-emerald-500 text-white"
        >
          Save & Continue
        </button>
      </div>
    </form>
  );
}
