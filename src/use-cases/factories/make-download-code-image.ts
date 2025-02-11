import { DownloadCodeImageUseCase } from "../download-code-image";
import { PrismaCodeRepository } from "@/repositories/prisma/prisma-code-repository";

export function MakeDownloadCodeImage() {
  const codeRepository = new PrismaCodeRepository();
  const downloadCodeImageUseCase = new DownloadCodeImageUseCase(codeRepository);

  return {
    downloadCodeImageUseCase
  }
}