import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Thư Viện Sách",
  description: "Thư viện sách cá nhân của tôi",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={geist.className}>
      <body className="min-h-screen bg-amber-50 text-stone-800">
        <header className="bg-amber-900 text-amber-50 shadow-md">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
            <span className="text-2xl">📚</span>
            <a href="/" className="text-xl font-bold tracking-tight hover:text-amber-200 transition-colors">
              Thư Viện Của Tôi
            </a>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
        <footer className="text-center text-sm text-stone-400 py-6 mt-8 border-t border-amber-200">
          © {new Date().getFullYear()} Thư Viện Cá Nhân
        </footer>
      </body>
    </html>
  )
}
