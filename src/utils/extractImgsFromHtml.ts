import { uploadOnBucket } from "./uploadOnBucket";

export async function extractImageUrlFromHtml(html: string) {
  const urlRegex = /https:\/\/[a-zA-Z0-9-]+\.s3\.us-west-2\.amazonaws\.com\/images\/[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/g;
  const matches = html.match(urlRegex) || [];
  
  if (matches?.length > 0) {
    const imgFromOurBucket = matches.map(async imgUrl => await uploadOnBucket(imgUrl))

    
    return await Promise.all(imgFromOurBucket)
  }
  
  return matches;
}