"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Document = dynamic(
  () => import("react-pdf").then((mod) => mod.Document),
  { ssr: false },
);

const Page = dynamic(() => import("react-pdf").then((mod) => mod.Page), {
  ssr: false,
});

if (typeof window !== "undefined") {
  import("react-pdf").then((pdfjs) => {
    pdfjs.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.pdfjs.version}/build/pdf.worker.min.mjs`;
  });
}

export default function PdfPreview({ objectUrl }: { objectUrl: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }
  return (
    <div className="w-full h-full overflow-hidden flex justify-center border rounded shadow">
      <Document
        key={objectUrl}
        file={objectUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => {
          console.error("Error Rendering File: ", error);
        }}
        loading={<p>Loading Preview...</p>}
      >
        <Page
          pageNumber={1}
          width={200}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
}
