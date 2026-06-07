import { supabase } from "./supabase"

export type Book = {
  id: string
  title: string
  author: string
  description: string
  cover: string
  pdf_url: string
  genre: string
  year: number
}

export async function getBooks(): Promise<Book[]> {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Lỗi tải danh sách sách:", error.message)
    return []
  }
  return data ?? []
}

export async function getBookById(id: string): Promise<Book | null> {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .single()

  if (error) return null
  return data
}
