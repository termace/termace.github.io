// given /LS/Maths get all files and sub-directories
export type Node = {
  name: string;
  type: "dir" | "file";
};
export async function getFiles(url: string): Promise<Node[]> {
  url = url.split("Non Scientific").join("adabe");
  const res = await fetch("/directory.json");
  const obj = await res.json();
  let arr = url.split("/");
  arr.splice(0, 3);
  let newObj = obj;
  while (arr.length >= 1) {
    for (let i = 0; i < Object.keys(newObj).length; i++) {
      if (encodeURIComponent(Object.keys(newObj)[i].trim()) === arr[0]) {
        newObj = newObj[Object.keys(newObj)[i]];
      }
    }
    arr.splice(0, 1);
  }

  let out: Node[] = [];

  for (const key of Object.keys(newObj)) {
    if (key !== "files") {
      out.push({
        name: key,
        type: "dir",
      });
    }
  }
  for (let i = 0; i < newObj.files?.length; i++) {
    out.push({
      name: newObj.files[i],
      type: "file",
    });
  }

  return out;
}

// English/Scientific/LS/Math
// arr = [English, Scientific, LS, Math]
// arr = [LS, Math]

// newObj = LS Content
// arr = [Math]
// newObj = Math content
