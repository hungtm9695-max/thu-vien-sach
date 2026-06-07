"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"

export default function AddBookModal() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fileName, setFileName] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Có lỗi xảy ra")
      } else {
        setOpen(false)
        form.reset()
        setFileName("")
        router.refresh()
      }
    } catch {
      setError("Không kết nối được server")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 bg-amber-800 hover:bg-amber-700 text-amber-50 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
      >
        <span className="text-base">+</span> Thêm sách
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
              <h2 className="text-lg font-bold text-stone-800">Thêm sách mới</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-stone-400 hover:text-stone-600 text-xl leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              {/* File PDF */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  File PDF <span className="text-red-500">*</span>
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-amber-200 rounded-lg p-4 text-center cursor-pointer hover:border-amber-400 transition-colors"
                >
                  {fileName ? (
                    <p className="text-sm text-stone-700 truncate">📄 {fileName}</p>
                  ) : (
                    <p className="text-sm text-stone-400">Nhấn để chọn file PDF</p>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  name="file"
                  accept="application/pdf"
                  required
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                />
              </div>

              {/* Tiêu đề */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  required
                  placeholder="Tên sách..."
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>

              {/* Tác giả */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Tác giả <span className="text-red-500">*</span>
                </label>
                <input
                  name="author"
                  required
                  placeholder="Tên tác giả..."
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>

              <div className="flex gap-3">
                {/* Thể loại */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-stone-700 mb-1">Thể loại</label>
                  <input
                    name="genre"
                    placeholder="Ví dụ: Y học..."
                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
                {/* Năm */}
                <div className="w-28">
                  <label className="block text-sm font-medium text-stone-700 mb-1">Năm</label>
                  <input
                    name="year"
                    type="number"
                    placeholder={String(new Date().getFullYear())}
                    min="1000"
                    max="2100"
                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
              </div>

              {/* Mô tả */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Mô tả</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Mô tả ngắn về sách..."
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none"
                />
              </div>

              {/* Mật khẩu */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="Nhập mật khẩu để upload..."
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 border border-stone-200 text-stone-600 rounded-lg py-2 text-sm hover:bg-stone-50 transition-colors"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-amber-800 hover:bg-amber-700 disabled:opacity-60 text-white rounded-lg py-2 text-sm font-medium transition-colors"
                >
                  {loading ? "Đang tải lên..." : "Thêm sách"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
