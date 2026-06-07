"use client"

import dynamic from "next/dynamic"

const PDFReader = dynamic(() => import("./PDFReader"), {
  ssr: false,
  loading: () => (
    <div className="py-20 text-center text-stone-400 animate-pulse">Đang tải sách...</div>
  ),
})

export default function PDFReaderWrapper({ pdfPath }: { pdfPath: string }) {
  return <PDFReader pdfPath={pdfPath} />
}
