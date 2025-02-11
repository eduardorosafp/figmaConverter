export function removeSchemaFromLiquid(liquidCode: string) {
  return liquidCode.replace(/{% schema %}[\s\S]*?{% endschema %}/g, '');
}