import { notFound } from "next/navigation"
import Link from "next/link"
import { getBookById } from "@/lib/books"
import PDFReaderWrapper from "@/app/components/PDFReaderWrapper"

export const dynamic = "force-dynamic"

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const book = await getBookById(id)

  if (!book) notFound()

  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-amber-700 transition-colors mb-6"
      >
        ← Quay lại thư viện
      </Link>

      <div className="bg-white rounded-xl border border-amber-100 shadow-sm p-6 mb-8">
        <div className="flex gap-6 flex-col sm:flex-row">
          <div className="w-full sm:w-32 h-44 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-5xl">📖</span>
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-1">{book.genre}</p>
            <h1 className="text-2xl font-bold text-stone-800 mb-1">{book.title}</h1>
            <p className="text-stone-500 mb-3">{book.author} · {book.year}</p>
            <p className="text-stone-600 text-sm leading-relaxed">{book.description}</p>
          </div>
        </div>
      </div>

      <div className="bg-stone-100 rounded-xl p-4">
        <PDFReaderWrapper pdfPath={book.pdf_url} />
      </div>
    </div>
  )
}
