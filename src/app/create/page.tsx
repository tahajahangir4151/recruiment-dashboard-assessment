"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

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
    console.log("Created", values);
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
          <div className="max-w-8xl mx-auto bg-white rounded-md border p-6">
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
    const name = recruitmentName.trim();
    const role = jobRole;
    const lvl = level;
    const other = otherRole.trim();
    const desc = description.trim();

    if (!name) {
      setError("Recruitment name is required");
      return;
    }
    if (!role) {
      setError("Job role is required");
      return;
    }

    if (role === "Other" && !other) {
      setError("Please specify the job role");
      return;
    }

    if (!lvl) {
      setError("Level is required");
      return;
    }

    if (!desc) {
      setError("Description is required");
      return;
    }
    setError("");
    onSave({
      recruitmentName: name,
      jobRole: role,
      level: lvl,
      otherRole: role === "Other" ? other : undefined,
      description: desc,
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
      <div>
        <input
          type="text"
          value={recruitmentName}
          onChange={(e) => setRecruitmentName(e.target.value)}
          placeholder="Enter name of your Recruitment"
          className="w-full px-3 py-2 rounded border text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <select
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="w-full px-3 py-2 rounded border text-sm"
          >
            <option>Job Role: Other</option>
            <option>UI/UX Designer</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Data Scientist</option>
          </select>
        </div>

        <div>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full px-3 py-2 rounded border text-sm"
          >
            <option value="">Select level of employee</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
      </div>

      {jobRole === "Other" && (
        <div>
          <input
            value={otherRole}
            onChange={(e) => setOtherRole(e.target.value)}
            placeholder="Other"
            className="w-full px-3 py-2 rounded border text-sm"
          />
        </div>
      )}

      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write description here"
          className="w-full px-3 py-2 rounded border text-sm h-32"
        />
      </div>

      <div className="flex items-center gap-3 justify-end">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 cursor-pointer rounded border text-slate-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-emerald-500 cursor-pointer text-white"
        >
          Save & Continue
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
