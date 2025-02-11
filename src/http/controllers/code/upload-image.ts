import { z } from "zod";
import { Request, Response } from "express";

import { MakeDownloadCodeImage } from "@/use-cases/factories/make-download-code-image";

export async function uploadImage(req: Request, res: Response) {
  // const converterBodySchema = z.object({
  //   images: z.any(),
  // })

  // const { images } = converterBodySchema.parse(req.body)

  try {
    const { downloadCodeImageUseCase } = MakeDownloadCodeImage();

    const newImagesReplacedBucket = await downloadCodeImageUseCase.execute({ images: req.body });

    return res.status(200).json(newImagesReplacedBucket);
  } catch (error) {
    throw error;
  }
}