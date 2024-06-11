import { useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getRemoteUrl } from "../utils/getRemoteUrl";
import { mapUrl } from "../utils/mapUrl";

interface Props {
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}

const PdfViewer = (props: Props) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const { filename, encoded } = useParams();
  const [loading, setLoading] = useState(true);

  useMemo(() => {
    props.setUrl(mapUrl(decodeURIComponent(encoded!)));
    if (filename) {
      const localUrl =
        mapUrl(decodeURIComponent(encoded!)) +
        `/${encodeURIComponent(filename)}`;
      const iframeUrl = `https://docs.google.com/gview?url=${getRemoteUrl(
        localUrl
      )}&embedded=true`;

      const iframe = ref.current;
      if (iframe) {
        iframe.src = iframeUrl;
        const id = setInterval(() => {
          iframe.src = iframeUrl;
        }, 5000);

        iframe.onload = () => {
          setLoading(false);
          clearInterval(id);
        };
      }
    }
  }, [filename, encoded, props]);

  if (!filename) {
    return <h1>No file found</h1>;
  }

  return (
    <>
      <iframe
        ref={ref}
        className={`${!loading ? "w-full h-[80vh]" : "w-0 h-0"}`}
        title="pdf"
      ></iframe>
      {loading && (
        <p className="text-center">
          This might take a while. Try refreshing the page periodically.
        </p>
      )}
    </>
  );
};

export default PdfViewer;
