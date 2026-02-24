"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormStatus from "@/components/FormStatus";

const CreateEventPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | "loading" | null>(null);
  const [agendaInput, setAgendaInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Convert agenda (textarea → array)
    const agendaArray = agendaInput
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    // Convert tags (comma separated → array)
    const tagsArray = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    formData.set("agenda", JSON.stringify(agendaArray));
    formData.set("tags", JSON.stringify(tagsArray));

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to create event");
      }

      setStatus("success");

      router.push("/events");
      router.refresh();
    } catch (err) {
      console.error(err);
      setStatus("error");
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1 className="text-center">Create New Event</h1>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6 mt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <input
              name="title"
              placeholder="Title"
              required
              className="w-full px-4 py-3 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition duration-200"
            />

            <textarea
              name="description"
              placeholder="Description"
              required
              rows={3}
              className="w-full px-4 py-3 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition duration-200 resize-y"
            />

            <textarea
              name="overview"
              placeholder="Overview"
              required
              rows={3}
              className="w-full px-4 py-3 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition duration-200 resize-y"
            />

            <div className="relative">
              <input
                type="file"
                name="image"
                placeholder="Event Image"
                required
                className="w-full px-4 py-3 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg text-neutral-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-neutral-800 file:text-neutral-300 hover:file:bg-neutral-700 file:transition file:duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-700"
              />
            </div>

            <input
              name="venue"
              placeholder="Venue"
              required
              className="w-full px-4 py-3 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition duration-200"
            />

            <input
              name="location"
              placeholder="Location"
              required
              className="w-full px-4 py-3 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition duration-200"
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="date"
                placeholder="Date"
                required
                className="w-full px-4 py-3 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition duration-200 scheme-dark"
              />
              <input
                type="time"
                name="time"
                placeholder="Time"
                required
                className="w-full px-4 py-3 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition duration-200 scheme-dark"
              />
            </div>

            <input
              name="mode"
              placeholder="Mode (online / hybrid / offline)"
              required
              className="w-full px-4 py-3 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition duration-200"
            />

            <input
              name="audience"
              placeholder="Audience"
              required
              className="w-full px-4 py-3 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition duration-200"
            />

            <textarea
              placeholder="Agenda (one per line)"
              value={agendaInput}
              onChange={(e) => setAgendaInput(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition duration-200 resize-y"
            />

            <input
              placeholder="Tags (comma separated)"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              required
              className="w-full px-4 py-3 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition duration-200"
            />

            <textarea
              name="organizer"
              placeholder="Organizer"
              required
              rows={2}
              className="w-full px-4 py-3 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition duration-200 resize-y"
            />
          </div>
        </div>

        <FormStatus
          type={status}
          message={
            status === "success"
              ? "Event created successfully!"
              : status === "error"
                ? "Something went wrong. Please try again."
                : status === "loading"
                  ? "Creating your event..."
                  : ""
          }
        />

        {/* Submit Button - Full width below columns */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-900 disabled:cursor-not-allowed text-neutral-200 font-medium rounded-lg transition duration-200 border border-neutral-700 hover:border-neutral-800 min-w-50 cursor-pointer"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateEventPage;
