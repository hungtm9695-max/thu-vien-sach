import fs from "fs"
import path from "path"

export type Book = {
  id: string
  title: string
  author: string
  description: string
  cover: string
  pdfPath: string
  genre: string
  year: number
}

const dataPath = path.join(process.cwd(), "data", "books.json")

export function getBooks(): Book[] {
  const raw = fs.readFileSync(dataPath, "utf-8")
  return JSON.parse(raw)
}

export function getBookById(id: string): Book | undefined {
  return getBooks().find((b) => b.id === id)
}

export function saveBooks(books: Book[]): void {
  fs.writeFileSync(dataPath, JSON.stringify(books, null, 2), "utf-8")
}
