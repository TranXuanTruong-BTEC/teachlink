import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "TeachLink – Kết nối giáo viên và nhà trường",
  description:
    "TeachLink giúp giáo viên tìm việc phù hợp và giúp nhà trường tìm được giáo viên tốt.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="flex min-h-screen flex-col">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-xl font-bold text-blue-700">
              Teach<span className="text-emerald-600">Link</span>
            </Link>
            <nav className="flex gap-6 text-sm font-medium text-slate-700">
              <Link href="/jobs" className="hover:text-blue-700">
                Việc làm
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
          © TeachLink. Kết nối giáo viên và nhà trường.
        </footer>
      </body>
    </html>
  );
}
