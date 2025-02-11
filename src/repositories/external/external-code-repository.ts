// // import { apiConverter } from "@/services/external-api";
// import { CodeRepository } from "../code-repository";

// export class ExternalCodeRepository implements CodeRepository {
//   async convertHtmlToLiquid(html: string, section: string): Promise<string> {
//     const { data } = await apiConverter.post('/convert', {
//       characterLength: 8,
//       cssPrefix: "",
//       customSettings: false,
//       fileName: section,
//       htmlData: html,
//       randomizeClasses: false
//   }, {
//       headers: {
//           'Content-Type': 'application/json',
//       }
//   });

//   return data.liquidCode;
//   }
// }