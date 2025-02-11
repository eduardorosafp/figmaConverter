export function replaceIfEndIf(
  liquidCode: string,
  imgsArrayFromBucket: string[]
) {
  return liquidCode.replace(
    /{%\s*if[^%]*%}([\s\S]*?){%-\s*endif\s*%}/gs,
    '<img src="" alt="Descrição da Imagem">'
  );
}
