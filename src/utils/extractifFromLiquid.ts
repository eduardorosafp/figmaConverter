export function extractifFromLiquid(liquidCode: string) {
  return liquidCode.replace(/{%\s*if[^%]*%}([\s\S]*?){%-\s*endif\s*%}/gs
, "");
}
