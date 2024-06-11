export function getRemoteUrl(local: string): string {
  // const map = new Map<string, string>([
  //   ["GS", encodeURIComponent("12 GS")],
  //   ["LS", encodeURIComponent("12 LS")],
  //   ["SG", encodeURIComponent("12 SG")],
  //   ["SV", encodeURIComponent("12 SV")],
  //   ["Phy", encodeURIComponent("Physics")],
  //   ["Maths", encodeURIComponent("Maths")],
  //   ["Bio", encodeURIComponent("Bio")],
  //   ["Chimie", encodeURIComponent("Chimie")],
  //   ["Chem", encodeURIComponent("Chem")],
  // ]);
  local = local.split("Non Scientific").join("/adabe");
  let arr = local.split("/");
  arr.splice(0, 4);
  let remote = [];
  for (let i = 0; i < arr.length; i++) {
    // if (map.has(arr[i])) {
    //   remote.push(map.get(arr[i]));
    // } else {
    remote.push(arr[i]);
    // }
  }

  let out =
    "https://raw.githubusercontent.com/termace/files/master/" +
    remote.join("/");

  return out;
}
