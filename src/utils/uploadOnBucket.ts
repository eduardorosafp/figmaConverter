import axios from "axios";
import { s3 } from "@/libs/aws";

export async function uploadOnBucket(imageUrl: string) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    const params = {
      Bucket: 'liquifi-images',
      Key: `liquifi-${Date.now()}.png`,
      Body: response.data,
    };
  
    const { Location } = await s3.upload(params).promise();
  
    return Location;
  } catch (error) {
    return ''
  }  
}