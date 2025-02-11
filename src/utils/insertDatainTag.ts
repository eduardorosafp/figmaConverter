export function insertDataInTag(htmlCode: string) {
  // Substituição para data-type="xxx"
  const novoCodigo = htmlCode.replace(
    /<(\w+)([^>]*)data-type="([^"]+)"([^>]*)>(.*?)<\/\1>/gs,
    '<$1$2data-type="$3"$4>{{$3}}</$1>'
  );

  // Substituição para data-type="product.price" e data-variable="currency"
  const novoCodigoComCurrency = novoCodigo.replace(
    /<(\w+)([^>]*)data-type="([^"]+)"([^>]*)data-variable="currency"([^>]*)>(.*?)<\/\1>/gs,
    `<$1$2data-type="$3"$4>{{$3 | money}}</$1>`
  );

  return novoCodigoComCurrency;
}
