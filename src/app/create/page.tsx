"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { FormState, HandleSaveProp } from "@/types/types";
import { useAddRecruitmentMutation } from "@/store/recruitmentsApi";
import { Loader } from "lucide-react";

export default function CreatePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addRecruitment] = useAddRecruitmentMutation();

  const router = useRouter();

  const handleSave = async (values: HandleSaveProp) => {
    try {
      const res = await addRecruitment({
        recruitmentName: values.recruitmentName,
        jobRole: values.jobRole,
        level: values.level,
        otherRole: values.otherRole,
        description: values.description,
      });

      console.log("Created:", res);
      router.push("/");
    } catch (err) {
      console.error("Failed to create recruitment:", err);
    }
  };

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

const CreateForm = ({
  onSave,
}: {
  onSave: (values: HandleSaveProp) => void;
}) => {
  const initialState: FormState = {
    recruitmentName: "",
    jobRole: "Other",
    level: "",
    otherRole: "",
    description: "",
  };
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { recruitmentName, jobRole, level, otherRole, description } = form;

    if (!recruitmentName.trim()) {
      return setError("Recruitment name is required");
    }

    if (!jobRole) {
      return setError("Job role is required");
    }

    if (jobRole === "Other" && !otherRole.trim()) {
      return setError("Please specify the job role");
    }

    if (!level) {
      return setError("Level is required");
    }

    if (!description.trim()) {
      return setError("Description is required");
    }

    setError("");

    onSave({
      recruitmentName: recruitmentName.trim(),
      jobRole,
      level,
      otherRole: jobRole === "Other" ? otherRole.trim() : undefined,
      description: description.trim(),
    });
  };

  const handleCancel = () => {
    setForm(initialState);
    setError("");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="recruitmentName"
          value={form.recruitmentName}
          onChange={handleChange}
          placeholder="Enter name of your Recruitment"
          className="w-full px-3 py-2 rounded border text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <select
            name="jobRole"
            value={form.jobRole}
            onChange={handleChange}
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
            name="level"
            value={form.level}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border text-sm"
          >
            <option value="">Select level of employee</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
      </div>

      {form.jobRole === "Other" && (
        <div>
          <input
            name="otherRole"
            value={form.otherRole}
            onChange={handleChange}
            placeholder="Other"
            className="w-full px-3 py-2 rounded border text-sm"
          />
        </div>
      )}

      <div>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
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
};
