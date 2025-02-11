import { z } from "zod";
import { Request, Response } from "express";

import { extractImageUrlFromHtml } from "@/utils/extractImgsFromHtml";
import { removeSchemaFromLiquid } from "@/utils/removeSchemaFromLiquid";
import { insertDataInTag } from "@/utils/insertDatainTag";
import { insertLinkinLiquid } from "@/utils/insertLinkinLiquid";
import { insertLiquidImages } from "@/utils/insertLiquidImages";
import { insertcartinLiquid } from "@/utils/insertcartinLiquid";

export async function converter(req: Request, res: Response) {
  const converterBodySchema = z.object({
    html: z.string(),
  });

  const { html } = converterBodySchema.parse(req.body);
  const imgsArrayFromBucket = await extractImageUrlFromHtml(html);
  try {
    const codeConvertedString =
      typeof html === "string" ? html : JSON.stringify(html);
    const regex = /<img[^>]*src="([^"]*)"[^>]*>/gs;

    let imageIndex = 0; // Inicialize um índice para rastrear as imagens

    const codeConvertedImages = codeConvertedString.replace(
      regex,
      (match: string, capturedGroup: string) => {
        // Verifica se o índice atual está dentro dos limites do array
        if (imageIndex < imgsArrayFromBucket.length) {
          const imgSrc = `<img src="${imgsArrayFromBucket[imageIndex]}" alt="Descrição da Imagem">`;
          imageIndex++; // Avance para a próxima imagem no array
          return imgSrc;
        } else {
          // Se não houver mais imagens, mantenha a tag original
          return match;
        }
      }
    );

    // Chama a função removeSchemaFromLiquid para remover o esquema
    const liquidCodeFormatted = removeSchemaFromLiquid(codeConvertedImages);

    const codeWithLink = insertLinkinLiquid(liquidCodeFormatted);

    const codeWithCart = insertcartinLiquid(codeWithLink);

    const finalCode = insertDataInTag(codeWithCart);

    const codeImageProductsFinal = insertLiquidImages(finalCode);

    // Crie um objeto JSON com a propriedade "liquidCode"
    const responseObject = { liquidCode: codeImageProductsFinal };

    return res.status(200).json(responseObject);
  } catch (error) {
    throw error;
  }
}
