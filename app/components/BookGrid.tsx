"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import type { Book } from "@/lib/books"
import AddBookModal from "./AddBookModal"

function BookCard({ book }: { book: Book }) {
  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      {/* Bìa sách */}
      <div className="relative aspect-[2/3] bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
        {book.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center">
            <div className="text-4xl mb-2">📚</div>
            <p className="text-xs font-semibold text-blue-800 leading-tight line-clamp-3">{book.title}</p>
            <p className="text-xs text-blue-600 mt-1 line-clamp-1">{book.author}</p>
          </div>
        )}
        {/* Badge thể loại */}
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
          {book.genre}
        </span>
      </div>

      {/* Thông tin + nút */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <div>
          <h3 className="font-bold text-sm text-gray-800 leading-tight line-clamp-2">{book.title}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{book.author}</p>
        </div>
        <Link
          href={`/books/${book.id}`}
          className="mt-auto block text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-3 rounded transition-colors tracking-wide"
        >
          ĐỌC NGAY
        </Link>
      </div>
    </div>
  )
}

export default function BookGrid({ books }: { books: Book[] }) {
  const [search, setSearch] = useState("")
  const [activeGenre, setActiveGenre] = useState("Tất cả")

  const genres = useMemo(() => {
    const set = new Set(books.map((b) => b.genre))
    return ["Tất cả", ...Array.from(set)]
  }, [books])

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const matchGenre = activeGenre === "Tất cả" || b.genre === activeGenre
      const q = search.toLowerCase()
      const matchSearch = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      return matchGenre && matchSearch
    })
  }, [books, search, activeGenre])

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-blue-700 text-white text-center py-10 px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1">
          KHO SÁCH ONLINE
        </h1>
        <p className="text-blue-200 text-sm mb-6 uppercase tracking-widest">
          Tổng hợp những đầu sách hay nhất
        </p>
        {/* Thanh tìm kiếm */}
        <div className="max-w-xl mx-auto relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm sách, tác giả..."
            className="w-full rounded-full py-3 pl-5 pr-12 text-gray-800 text-sm focus:outline-none shadow-lg"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Thanh thể loại */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGenre(g)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                activeGenre === g
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Đếm và nút thêm */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            {filtered.length} cuốn sách{search && ` cho "${search}"`}
          </p>
          <AddBookModal />
        </div>

        {/* Lưới sách */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">📭</p>
            <p>Không tìm thấy sách nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-6 border-t border-gray-100 mt-4">
        © {new Date().getFullYear()} Kho Sách Online
      </footer>
    </div>
  )
}
