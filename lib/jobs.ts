import { supabasePublic } from "@/lib/supabase-public";

export type Job = {
  id: string;
  title: string;
  subject: string | null;
  level: string | null;
  quantity: number;
  province: string | null;
  salary_min: number | null;
  salary_max: number | null;
  requirements: string | null;
  description: string | null;
  deadline: string | null;
  created_at: string;
};

export const LEVEL_LABELS: Record<string, string> = {
  mam_non: "Mầm non",
  tieu_hoc: "Tiểu học",
  thcs: "THCS",
  thpt: "THPT",
  trung_tam: "Trung tâm",
  khac: "Khác",
};

function toMillion(n: number) {
  return `${(n / 1_000_000).toLocaleString("vi-VN", { maximumFractionDigits: 1 })} triệu`;
}

export function formatSalary(min: number | null, max: number | null) {
  if (min && max) return `${toMillion(min)} – ${toMillion(max)}`;
  if (min) return `Từ ${toMillion(min)}`;
  if (max) return `Đến ${toMillion(max)}`;
  return "Thỏa thuận";
}

export function formatDate(d: string | null) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("vi-VN");
}

export async function getJobs(opts: { q?: string; limit?: number } = {}) {
  let query = supabasePublic
    .from("public_job_openings")
    .select("*")
    .order("created_at", { ascending: false });

  const q = (opts.q ?? "").replace(/[,()%*]/g, " ").trim();
  if (q) {
    query = query.or(
      `title.ilike.%${q}%,subject.ilike.%${q}%,province.ilike.%${q}%`
    );
  }
  if (opts.limit) query = query.limit(opts.limit);

  const { data, error } = await query;
  if (error) {
    console.error("getJobs:", error.message);
    return [] as Job[];
  }
  return (data ?? []) as Job[];
}

export async function getJob(id: string) {
  const { data, error } = await supabasePublic
    .from("public_job_openings")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("getJob:", error.message);
    return null;
  }
  return (data as Job | null) ?? null;
}
