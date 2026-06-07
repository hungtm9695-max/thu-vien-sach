import { notFound } from "next/navigation"
import Link from "next/link"
import { getBookById } from "@/lib/books"
import PDFReaderWrapper from "@/app/components/PDFReaderWrapper"

export const dynamic = "force-dynamic"

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const book = await getBookById(id)
  if (!book) notFound()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-700 text-white px-4 py-3 flex items-center gap-3">
        <Link href="/" className="text-blue-200 hover:text-white text-sm transition-colors">
          ← Kho Sách
        </Link>
        <span className="text-blue-400">|</span>
        <span className="text-sm font-medium truncate">{book.title}</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Thông tin sách */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6 flex gap-5 flex-col sm:flex-row">
          <div className="w-24 h-36 sm:w-28 sm:h-40 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
            {book.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={book.cover} alt={book.title} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <span className="text-4xl">📚</span>
            )}
          </div>
          <div className="flex-1">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full uppercase mb-2">
              {book.genre}
            </span>
            <h1 className="text-xl font-bold text-gray-800 mb-1">{book.title}</h1>
            <p className="text-gray-500 text-sm mb-2">{book.author} · {book.year}</p>
            {book.description && (
              <p className="text-gray-600 text-sm leading-relaxed">{book.description}</p>
            )}
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <PDFReaderWrapper pdfPath={book.pdf_url} />
        </div>
      </div>
    </div>
  )
}
