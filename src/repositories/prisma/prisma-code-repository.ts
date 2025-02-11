import { CodeRepository } from "../code-repository";
import { uploadOnBucket } from "@/utils/uploadOnBucket";

export class PrismaCodeRepository implements CodeRepository {
  async uploadImage(images: object) {
    const imagesReplacedBucket = Object.entries(images).map(async image => {
      const [key, value] = image;

      const newValue = await uploadOnBucket(value);

      return [key, newValue];
    })

    return Object.fromEntries(await Promise.all(imagesReplacedBucket));
  }
}