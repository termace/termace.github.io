export function getRemoteUrl(local: string, lower = false): string {
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
  arr.splice(0, 3);
  let remote = [];
  for (let i = 0; i < arr.length; i++) {
    // if (map.has(arr[i])) {
    //   remote.push(map.get(arr[i]));
    // } else {
    remote.push(lower ? arr[i].toLowerCase() : arr[i]);
    // }
  }

  let out = remote.join("/");

  return out;
}
