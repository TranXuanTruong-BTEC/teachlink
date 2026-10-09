import { Suspense } from "react";
import JobCard from "@/components/JobCard";
import { getJobs } from "@/lib/jobs";

async function JobsContent({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const jobs = await getJobs({ q });

  return (
    <>
      <form action="/jobs" method="get" className="mt-4 flex gap-2">
        <input
          name="q"
          defaultValue={q ?? ""}
          placeholder="Môn dạy, vị trí hoặc tỉnh/thành..."
          className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
        >
          Tìm
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-500">{jobs.length} vị trí</p>

      {jobs.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          Không tìm thấy vị trí phù hợp.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </>
  );
}

export default function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold">Việc làm giáo viên</h1>
      <Suspense fallback={<p className="mt-4 text-slate-500">Đang tải...</p>}>
        <JobsContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
