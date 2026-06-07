import { getBooks } from "@/lib/books"
import BookGrid from "@/app/components/BookGrid"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const books = await getBooks()
  return <BookGrid books={books} />
}
