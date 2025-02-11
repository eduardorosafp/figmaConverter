import { Router} from "express";

import { converter } from "./converter";
import { updateShopifyTheme } from "./update-shopify-theme";

const routes = Router();

routes.post("/convert", converter)
routes.post("/update-shopify-theme", updateShopifyTheme)

export const codeRoutes = routes;