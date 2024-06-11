/**
 *  example: /en/nsc/history -> English/Non Scientific/History
 */
export function mapUrl(url: string): string {
  const map = new Map<string, string>([
    ["en", "English"],
    ["fr", "Francais"],
    ["nsc", "Non Scientific"],
    ["sc", "Scientific"],
    ["language", ""],
    ["gs", "GS"],
    ["ls", "LS"],
    ["sg", "SG"],
    ["sv", "SV"],
    ["maths", "Maths"],
    ["phy", "Phy"],
    ["chem", "Chem"],
    ["chimie", "Chimie"],
    ["bio", "Bio"],
    ["hist", "تاريخ"],
    ["geo", "جغرافيا"],
    ["philo", "الفلسفة و الحضرات"],
    ["eng", "English"],
    ["civ", "تربية مدنية"],
    ["arab", "اللغة العربية و آدابها"],
  ]);

  let out: string[] = [];
  url.split("/").forEach((one) => {
    let alt = map.get(one);
    if (alt !== undefined) out.push(alt);
    else out.push(one);
  });

  return out.join("/");
}
