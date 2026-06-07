import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kho Sách Online",
  description: "Tổng hợp những đầu sách hay nhất",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={geist.className}>
      <body className="min-h-screen bg-gray-50 text-gray-800">
        {children}
      </body>
    </html>
  )
}
