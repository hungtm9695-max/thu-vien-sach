"use client"

export default function PDFReader({ pdfPath }: { pdfPath: string }) {
  return (
    <iframe
      src={pdfPath}
      className="w-full rounded-lg border border-amber-100"
      style={{ height: "85vh", minHeight: 500 }}
      title="PDF Viewer"
    />
  )
}
