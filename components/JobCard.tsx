import Link from "next/link";
import { Job, LEVEL_LABELS, formatSalary } from "@/lib/jobs";

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-400 hover:shadow-md"
    >
      <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
      <div className="mt-2 flex flex-wrap gap-2 text-sm">
        {job.level && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
            {LEVEL_LABELS[job.level] ?? job.level}
          </span>
        )}
        {job.subject && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
            {job.subject}
          </span>
        )}
        {job.province && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
            {job.province}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
        <span className="font-medium text-emerald-700">
          {formatSalary(job.salary_min, job.salary_max)}
        </span>
        <span>Cần tuyển: {job.quantity}</span>
      </div>
    </Link>
  );
}
