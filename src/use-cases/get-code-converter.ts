import { CodeRepository } from "@/repositories/code-repository";
import { InvalidRequestError } from "./errors/invalid-request";

interface GetCodeConverterRequest {
  html: string;
  section: string;
}

export class GetCodeConverterUseCase {
  constructor (private codeRepository: CodeRepository) {}

  async execute(request: GetCodeConverterRequest) {
    const { html, section } = request;

    if (!html || !section) {
      throw new InvalidRequestError();
    }

    const code = await this.codeRepository.convertHtmlToLiquid(html, section)

    return code;
  }
}