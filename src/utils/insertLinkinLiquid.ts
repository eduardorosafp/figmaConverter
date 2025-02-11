export function insertLinkinLiquid(htmlCode: string) {
  const newCode = htmlCode.replace(
    /<(\w+)([^>]*)data-link="([^"]+)"([^>]*)>(.*?)<\/\1>/gs,
    '<a href="$3" target="_blank">$5</a>'
  );

  return newCode;
}
