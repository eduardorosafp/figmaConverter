import { z } from "zod";
import fetch from "node-fetch";
import { Request, Response } from "express";

export async function updateShopifyTheme(req: Request, res: Response) {
  const updateShopifyThemeBodySchema = z.object({
    shopifyCredentials: z.object({
      url: z.string(),
      token: z.string(),
    }),
    code: z.string(),
  });

  const { shopifyCredentials, code: liquidCode } = updateShopifyThemeBodySchema.parse(req.body);
  const { url: storeURL, token: storeToken } = shopifyCredentials;

  try {
    const response = await fetch(`https://${storeURL}/admin/api/2022-01/themes.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": storeToken,
      },
    });
    const themesData = await response.json() as any;
    const mainTheme = themesData.themes.find((theme: any) => theme.role === "main");

    await fetch(`https://${storeURL}/admin/api/2022-01/themes/${mainTheme.id}/assets.json?asset[key]=templates/product.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": storeToken,
      },
    })

    await fetch(`https://${storeURL}/admin/api/2022-01/themes/${mainTheme.id}/assets.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": storeToken,
      },
      body: JSON.stringify({
        asset: {
          key: "templates/product.liquid",
          value: liquidCode,
        },
      }),
    });

    await fetch(`https://${storeURL}/admin/api/2022-01/themes/${mainTheme.id}/actions/publish.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": storeToken,
      },
    });

    return res.status(200).json({ message: "Shopify theme updated successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
