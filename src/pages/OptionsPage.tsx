import { Link, useLocation } from "react-router-dom";
import { Option } from "../components";
import { OptionT } from "../types/OptionType";
import { useEffect } from "react";
import { mapUrl } from "../utils/mapUrl";
import { getFiles, type Node } from "../utils/getFiles";
import { useState } from "react";

interface Props {
  url?: string;
  title: string;
  options?: OptionT[];
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function OptionsPage(props: Props) {
  const location = useLocation();
  const [files, setFiles] = useState<Node[]>([]);
  async function getFilesWrap(url: string) {
    const temp = await getFiles(url);
    setFiles(temp);
  }
  useEffect(() => {
    let newUrl = mapUrl(window.location.pathname);
    props.setUrl(newUrl);
    if (!props.options) {
      getFilesWrap(newUrl);
    }
  }, [location]);

  return (
    <div className="flex flex-col gap-4 max-h-[80vh]">
      <h1 className="text-3xl text-center text-black font-kool select-none">
        {props.title}
      </h1>
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 justify-center items-stretch max-w-[280px]">
          {props.options ? (
            props.options.map((val, i) => {
              return (
                <Link to={val.goTo!} key={i}>
                  <Option opt={val} dir={true} />
                </Link>
              );
            })
          ) : files.length > 0 ? (
            files.map((val, i) => {
              if (val.type === "dir") {
                return (
                  <Link to={window.location.pathname + "/" + val.name} key={i}>
                    <Option dir opt={{ title: val.name }} />
                  </Link>
                );
              } else {
                return (
                  <Link
                    to={
                      encodeURIComponent(window.location.pathname) +
                      "/pdf/" +
                      val.name
                    }
                    key={i}
                  >
                    <Option opt={{ title: val.name }} dir={false} key={i} />
                  </Link>
                );
              }
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
