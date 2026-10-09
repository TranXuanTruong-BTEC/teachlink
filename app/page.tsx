import { Suspense } from "react";
import Link from "next/link";
import JobCard from "@/components/JobCard";
import { getJobs } from "@/lib/jobs";

async function LatestJobs() {
  const jobs = await getJobs({ limit: 6 });

  if (jobs.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        Hiện chưa có vị trí nào được đăng. Vui lòng quay lại sau.
      </p>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-b from-blue-50 to-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Kết nối giáo viên với nhà trường phù hợp
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Gửi hồ sơ một lần, TeachLink sẽ kiểm tra, giới thiệu đến các trường
            đang cần tuyển và cập nhật tiến độ cho bạn ngay trên website.
          </p>
          <form
            action="/jobs"
            method="get"
            className="mx-auto mt-8 flex max-w-xl gap-2"
          >
            <input
              name="q"
              placeholder="Môn dạy, vị trí hoặc tỉnh/thành..."
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Tìm việc
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Vị trí đang tuyển</h2>
          <Link href="/jobs" className="text-sm font-medium text-blue-700 hover:underline">
            Xem tất cả
          </Link>
        </div>
        <Suspense
          fallback={<p className="text-slate-500">Đang tải danh sách...</p>}
        >
          <LatestJobs />
        </Suspense>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <h2 className="mb-6 text-2xl font-bold">Quy trình đơn giản</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["1. Gửi hồ sơ", "Tạo tài khoản, điền thông tin và tải CV lên."],
            ["2. Chúng tôi kiểm tra", "Nhân viên xem xét hồ sơ và liên hệ nếu cần bổ sung."],
            ["3. Giới thiệu đến trường", "Hồ sơ được duyệt sẽ được giới thiệu đến các trường phù hợp."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-blue-700">{t}</h3>
              <p className="mt-2 text-sm text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
