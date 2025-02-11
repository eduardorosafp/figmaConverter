export interface CodeRepository {
  convertHtmlToLiquid?(html: string, section: string): Promise<string>;
  uploadImage?(images: any): Promise<any>;
  //insertcode?(data: String): Promise<String>;
}