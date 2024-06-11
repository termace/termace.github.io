import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { Url } from "./components";
import { OptionsPage, PdfViewer } from "./pages";

export default function App() {
  const [url, setUrl] = useState<string>("");
  return (
    <div className="flex items-center justify-center w-full h-[100vh] m-0 p-0 overflow-auto bg-[rgb(255,255,255)] bg-[linear-gradient(315deg,_rgba(255,255,255,1)_0%,_rgba(246,244,254,1)_39%,_rgba(235,230,253,1)_58%,_rgba(176,158,248,1)_100%)]">
      <Router>
        <Url url={url} setUrl={setUrl} />
        <Routes>
          <Route
            path="/"
            element={
              <OptionsPage
                setUrl={setUrl}
                title={"The Termace Project"}
                options={[{ title: "Explore", goTo: "/language" }]}
              />
            }
          />
          <Route
            path="/language"
            element={
              <OptionsPage
                setUrl={setUrl}
                title={"Chose the language"}
                options={[
                  { title: "English", goTo: "/en" },
                  { title: "Francais", goTo: "/fr" },
                ]}
              />
            }
          />
          <Route
            path="/en"
            element={
              <OptionsPage
                setUrl={setUrl}
                title={"What are we going to study today?"}
                options={[
                  { title: "Scientific", goTo: "/en/sc" },
                  { title: "Non Scientific", goTo: "/en/nsc" },
                ]}
              />
            }
          />
          <Route
            path="/fr"
            element={
              <OptionsPage
                setUrl={setUrl}
                title={"Qu'est ce que nous etudions aujourd'hui?"}
                options={[
                  { title: "Scientifique", goTo: "/fr/sc" },
                  { title: "Non Scientifique", goTo: "/fr/nsc" },
                ]}
              />
            }
          />
          <Route
            path="/en/sc"
            element={
              <OptionsPage
                setUrl={setUrl}
                title={"Chose faculty"}
                options={[
                  { title: "GS", goTo: "/en/sc/gs" },
                  { title: "LS", goTo: "/en/sc/ls" },
                ]}
              />
            }
          />
          <Route
            path="/fr/sc"
            element={
              <OptionsPage
                setUrl={setUrl}
                title={"Choisir la faculte"}
                options={[
                  { title: "SG", goTo: "/fr/sc/sg" },
                  { title: "SV", goTo: "/fr/sc/sv" },
                ]}
              />
            }
          />
          <Route
            path="/fr/sc/sg"
            element={
              <OptionsPage
                setUrl={setUrl}
                title={"Choisir la matiere"}
                options={[
                  { title: "Mathematiques", goTo: "/fr/sc/sg/maths" },
                  { title: "Physique", goTo: "/fr/sc/sg/phy" },
                  { title: "Chimie", goTo: "/fr/sc/sg/chimie" },
                ]}
              />
            }
          />
          <Route
            path="/fr/sc/sv"
            element={
              <OptionsPage
                setUrl={setUrl}
                title={"Choisir la matiere"}
                options={[
                  { title: "Mathematiques", goTo: "/fr/sc/sv/maths" },
                  { title: "Physique", goTo: "/fr/sc/sv/phy" },
                  { title: "Chimie", goTo: "/fr/sc/sv/chimie" },
                  { title: "Biologie", goTo: "/fr/sc/sv/bio" },
                ]}
              />
            }
          />
          <Route
            path="/en/sc/gs"
            element={
              <OptionsPage
                setUrl={setUrl}
                title={"Chose the subject"}
                options={[
                  { title: "Maths", goTo: "/en/sc/gs/maths" },
                  { title: "Physics", goTo: "/en/sc/gs/phy" },
                  { title: "Chem", goTo: "/en/sc/gs/chem" },
                ]}
              />
            }
          />
          <Route
            path="/en/sc/ls"
            element={
              <OptionsPage
                setUrl={setUrl}
                title={"Chose the subject"}
                options={[
                  { title: "Maths", goTo: "/en/sc/ls/maths" },
                  { title: "Physics", goTo: "/en/sc/ls/phy" },
                  { title: "Chem", goTo: "/en/sc/ls/chem" },
                  { title: "Bio", goTo: "/en/sc/ls/bio" },
                ]}
              />
            }
          />
          <Route
            path=":encoded/pdf/:filename"
            element={<PdfViewer setUrl={setUrl} />}
          />
          <Route
            path="*"
            element={<OptionsPage url={url} title={""} setUrl={setUrl} />}
          />
        </Routes>
      </Router>
    </div>
  );
}
