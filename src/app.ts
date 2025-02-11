import express from "express";
import cors from "cors";

import { codeRoutes } from "./http/controllers/code/routes";
import { verifyToken } from "./middlewares/acess-token-middleware";

const app = express();
app.use(express.json());
app.use(cors());

app.use(verifyToken)
app.use(codeRoutes)

export default app;