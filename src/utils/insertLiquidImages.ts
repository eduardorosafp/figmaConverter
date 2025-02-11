export function insertLiquidImages(htmlCode: string) {
  const newCode = htmlCode.replace(
    /{{\s*product\.images\s*}}/gs,
    '{{ product | img_tag: "image alt text", "", "450x450" }}'
  );

  return newCode;
}
