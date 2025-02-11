import { CodeRepository } from "@/repositories/code-repository";
import { InvalidRequestError } from "./errors/invalid-request";

interface DownloadCodeImageUseCaseRequest {
  images: any;
}

export class DownloadCodeImageUseCase {
  constructor (private codeRepository: CodeRepository) {}

  async execute(request: DownloadCodeImageUseCaseRequest) {
    const { images } = request;

    if (!images) {
      throw new InvalidRequestError();
    }

    if (this.codeRepository.uploadImage) {
      const imagesReplacedBucket = await this.codeRepository.uploadImage(images)

      return imagesReplacedBucket;
    }
  }
}