import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getRemoteUrl } from "../utils/getRemoteUrl";
import { mapUrl } from "../utils/mapUrl";
import * as pdfjs from "pdfjs-dist";
import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";

// Set worker source URL
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.3.136/build/pdf.worker.min.mjs`;

interface Props {
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}

const PdfViewer: React.FC<Props> = ({ setUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { filename, encoded } = useParams<{
    filename?: string;
    encoded?: string;
  }>();
  const [loading, setLoading] = useState(true);
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [numPages, setNumPages] = useState(0); // Total number of pages
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!filename || !encoded) return;

    const localUrl =
      mapUrl(decodeURIComponent(encoded)) + `/${encodeURIComponent(filename)}`;

    // Load balancing between github and netlify
    const remoteUrl =
      Math.random() > 0.5
        ? `https://raw.githubusercontent.com/termace/files/master/${getRemoteUrl(
            localUrl
          )}`
        : `https://termace-files.netlify.app/${getRemoteUrl(localUrl, true)}`;

    async function loadPdf(url: string) {
      try {
        const proxy = await pdfjs.getDocument({
          url: url,
        }).promise;
        if (document) document.destroy();
        setDocument(proxy);
        setNumPages(proxy.numPages); // Set total number of pages
        setLoading(false);
        renderPage(proxy, 1);
      } catch (error) {
        console.error("Error loading PDF:", error);
        setLoading(true);
        setError(true);
      }
    }

    setUrl(mapUrl(decodeURIComponent(encoded))); // Update URL state

    loadPdf(remoteUrl);

    return () => {
      if (document) {
        document.destroy();
      }
    };
  }, [filename, encoded, setUrl]);

  function renderPage(pdf: PDFDocumentProxy, pageNumber: number) {
    pdf.getPage(pageNumber).then((page) => {
      const viewport = page.getViewport({ scale: 1 });

      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        page.render({ canvasContext: context!, viewport: viewport });
      }
    });
  }

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= numPages) {
      setCurrentPage(pageNumber);
      renderPage(document!, pageNumber);
    }
  };

  const nextPage = () => {
    if (currentPage < numPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  if (!filename) {
    return <h1>No file found</h1>;
  }

  return (
    <>
      {!loading && (
        <>
          <div className="absolute bottom-2 flex gap-1">
            <button
              onClick={prevPage}
              disabled={currentPage <= 1}
              className={`bg-[#ffffff8c] p-1 text-xs${
                currentPage <= 1
                  ? "bg-gray-300 text-gray-500 text-xs p-1 cursor-not-allowed"
                  : "bg-[#ffffff9f] p-1 text-xs text-[#000] border-[#000] border-[2px]"
              }`}
            >
              ({currentPage <= 1 ? currentPage : currentPage - 1}) &lt; Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage >= numPages}
              className={` ${
                currentPage >= numPages
                  ? "bg-gray-300 text-gray-500 text-xs p-1 cursor-not-allowed"
                  : "bg-[#ffffff9f] p-1 text-xs text-[#000] border-[#000] border-[2px]"
              }`}
            >
              Next &gt; (
              {currentPage >= numPages ? currentPage : currentPage + 1})
            </button>
          </div>
          <canvas className="max-w-[100%]" ref={canvasRef}></canvas>
        </>
      )}

      {loading && (
        <p className="text-center">
          {error ? (
            <span>
              There was an error displaying the pdf, it's safe to assume that
              the best thing to do is to download it.
            </span>
          ) : (
            <span>
              This might take a while. Do NOT refresh the page more than once.
            </span>
          )}
          <br />
          If the file is not loading, try{" "}
          <a
            className="underline"
            href={getRemoteUrl(
              mapUrl(decodeURIComponent(encoded!)) +
                `/${encodeURIComponent(filename)}`
            )}
          >
            downloading it
          </a>
          .
        </p>
      )}
    </>
  );
};

export default PdfViewer;
