import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { getBooks, saveBooks, type Book } from "@/lib/books"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const file = formData.get("file") as File | null
    const title = formData.get("title") as string
    const author = formData.get("author") as string
    const genre = formData.get("genre") as string
    const year = parseInt(formData.get("year") as string) || new Date().getFullYear()
    const description = formData.get("description") as string

    if (!file || !title || !author) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 })
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Chỉ chấp nhận file PDF" }, { status: 400 })
    }

    const filename =
      file.name
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9\-_.]/g, "")
        .toLowerCase() || `book-${Date.now()}.pdf`

    const booksDir = path.join(process.cwd(), "public", "books")
    if (!fs.existsSync(booksDir)) fs.mkdirSync(booksDir, { recursive: true })

    const filePath = path.join(booksDir, filename)
    const buffer = Buffer.from(await file.arrayBuffer())
    fs.writeFileSync(filePath, buffer)

    const books = getBooks()
    const newId = (Math.max(0, ...books.map((b) => parseInt(b.id) || 0)) + 1).toString()

    const newBook: Book = {
      id: newId,
      title,
      author,
      genre: genre || "Chưa phân loại",
      year,
      description: description || "",
      cover: "",
      pdfPath: `/books/${filename}`,
    }

    books.push(newBook)
    saveBooks(books)

    return NextResponse.json({ success: true, book: newBook })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 })
  }
}
