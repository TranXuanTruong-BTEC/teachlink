import { createClient } from "@supabase/supabase-js";

// Client dùng để đọc dữ liệu công khai (tin tuyển dụng) từ phía server.
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
