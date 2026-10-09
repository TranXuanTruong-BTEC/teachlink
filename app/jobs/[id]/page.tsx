import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LEVEL_LABELS, formatDate, formatSalary, getJob } from "@/lib/jobs";

async function JobDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) notFound();

  const rows: [string, string | null][] = [
    ["Cấp học", job.level ? LEVEL_LABELS[job.level] ?? job.level : null],
    ["Môn dạy", job.subject],
    ["Địa điểm", job.province],
    ["Mức lương", formatSalary(job.salary_min, job.salary_max)],
    ["Số lượng cần tuyển", String(job.quantity)],
    ["Hạn nộp hồ sơ", formatDate(job.deadline)],
  ];

  return (
    <>
      <h1 className="mt-3 text-2xl font-bold">{job.title}</h1>

      <dl className="mt-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        {rows
          .filter(([, v]) => v)
          .map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs uppercase tracking-wide text-slate-500">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
      </dl>

      {job.description && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Mô tả công việc</h2>
          <p className="mt-2 whitespace-pre-line text-slate-700">{job.description}</p>
        </section>
      )}
      {job.requirements && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Yêu cầu</h2>
          <p className="mt-2 whitespace-pre-line text-slate-700">{job.requirements}</p>
        </section>
      )}

      <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
        Chức năng đăng nhập và nộp hồ sơ sẽ được bổ sung ở bước tiếp theo.
      </div>
    </>
  );
}

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/jobs" className="text-sm text-blue-700 hover:underline">
        ← Quay lại danh sách
      </Link>
      <Suspense fallback={<p className="mt-4 text-slate-500">Đang tải...</p>}>
        <JobDetail params={params} />
      </Suspense>
    </div>
  );
}
