import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const file = formData.get("file") as File | null
    const title = formData.get("title") as string
    const author = formData.get("author") as string
    const genre = (formData.get("genre") as string) || "Chưa phân loại"
    const year = parseInt(formData.get("year") as string) || new Date().getFullYear()
    const description = (formData.get("description") as string) || ""
    const password = formData.get("password") as string

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Sai mật khẩu" }, { status: 401 })
    }

    if (!file || !title || !author) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 })
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Chỉ chấp nhận file PDF" }, { status: 400 })
    }

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`
    const buffer = Buffer.from(await file.arrayBuffer())

    const { error: uploadError } = await supabase.storage
      .from("books")
      .upload(filename, buffer, { contentType: "application/pdf", upsert: false })

    if (uploadError) {
      return NextResponse.json({ error: "Lỗi upload file: " + uploadError.message }, { status: 500 })
    }

    const { data: urlData } = supabase.storage.from("books").getPublicUrl(filename)

    const { data: book, error: dbError } = await supabase
      .from("books")
      .insert({ title, author, genre, year, description, cover: "", pdf_url: urlData.publicUrl })
      .select()
      .single()

    if (dbError) {
      return NextResponse.json({ error: "Lỗi lưu dữ liệu: " + dbError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, book })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 })
  }
}
