export function insertcartinLiquid(htmlcode: string) {
  const novoCodigo = htmlcode.replace(
    /<div\s+data-type="checkout"\s+data-variable="string"\s+id="([^"]+)">\s*<span\s+id="([^"]+)">([^"]+)<\/span>\s*<\/div>/gs,
    '<div data-variavel="checkout" data-variable="string" id="$1" style="cursor: pointer;">' +
      '<input type="hidden" id="product_id" value="{{ product.variants.first.id }}" />' +
      '<span id="$2">$3</span>' +
      "</div>" +
      "<script>" +
      'document.getElementById("$1").addEventListener("click", function() {' +
      'var productId = document.getElementById("product_id").value;' +
      "var quantity = 1;" +
      'var addToCartUrl = "/cart/add?id=" + encodeURIComponent(productId) + "&quantity=" + encodeURIComponent(quantity);' +
      "window.location.href = addToCartUrl;" +
      "});" +
      "</script>"
  );

  return novoCodigo;
}

// export function insertcartinLiquid(htmlcode: string) {
//   const novoCodigoComCart = htmlcode.replace(
//     /<div(.*?)data-type="checkout"(.*?)>(.*?)<\/div>/gs,
//     `<div$1data-variavel="checkout"$2><a href="/cart" style=" text-decoration: none;">$3</a></div>`
//   );

//   //  const novoCodigoComAdd = novoCodigoComCart.replace(
//   //    /<div([^>]*)data-type=".product.add_cart"([^>]*)><span id="(.*?)"(.*?)>(.*?)<\/span><\/div>/gs,
//   //    `<div$1 id="Button"><a href="/cart/add" id="$3"$2 style=" text-decoration: none;"><span$4>$5</span></a></div>`
//   //  );

//   const divImg = novoCodigoComCart.replace(
//     /<div(.*?)data-type="home"(.*?)>\s*<img(.*?)src="(.*?)"(.*?)><\/img>\s*<\/div>/gs,
//     `<div$1data-variavel="home"$2><a href="/" style="text-decoration: none;"><img$3src="$4" alt="Descrição da Imagem"></a></div>`
//   );

//   return divImg;
// }
