import Link from "next/link"
import type { Book } from "@/lib/books"

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/books/${book.id}`} className="group block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-amber-100 group-hover:-translate-y-1">
        <div className="h-56 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center overflow-hidden">
          <div className="text-6xl select-none">📖</div>
        </div>
        <div className="p-4">
          <p className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-1">{book.genre}</p>
          <h2 className="font-bold text-stone-800 text-lg leading-tight mb-1 group-hover:text-amber-700 transition-colors">
            {book.title}
          </h2>
          <p className="text-sm text-stone-500 mb-2">{book.author} · {book.year}</p>
          <p className="text-sm text-stone-600 line-clamp-2">{book.description}</p>
        </div>
        <div className="px-4 pb-4">
          <span className="inline-block text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
            Đọc ngay →
          </span>
        </div>
      </div>
    </Link>
  )
}
