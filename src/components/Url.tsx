import { useState, useMemo, Fragment } from "react";

interface Props {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function Url(props: Props) {
  const [components, setComponents] = useState<string[]>([]);

  useMemo(() => {
    setComponents(props.url.split("/").filter((val) => val !== "pdf"));
  }, [props.url]);

  return (
    <div className="absolute top-5 left-5">
      <h1 className="text-gray-800 font-medium">
        {components.map((comp, i) => {
          if (!["/", "/location"].includes(window.location.pathname) && i > 0)
            return (
              <span key={i}>
                {decodeURIComponent(comp)} {i !== components.length - 1 && `> `}
              </span>
            );
          return <Fragment key={i}></Fragment>;
        })}
      </h1>
    </div>
  );
}
