import { CodeRepository } from "../code-repository";

export class InMemoryCodeRepository implements CodeRepository {
  async convertHtmlToLiquid(html: string, section: string): Promise<string> {
    return Promise.resolve('Codigo convertido')
  }
}