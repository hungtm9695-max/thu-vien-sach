import { getBooks } from "@/lib/books"
import BookCard from "@/app/components/BookCard"
import AddBookModal from "@/app/components/AddBookModal"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const books = await getBooks()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-800 mb-1">Tủ Sách Của Tôi</h1>
          <p className="text-stone-500">{books.length} cuốn sách · Nhấn vào để đọc</p>
        </div>
        <AddBookModal />
      </div>
      {books.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          <p className="text-5xl mb-4">📚</p>
          <p className="text-lg">Chưa có sách nào. Nhấn &quot;+ Thêm sách&quot; để bắt đầu!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}
