import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import router from "./routers";
import context from "./context";

dotenv.config();

const app = express();

app.use(cors());

app.use(
    "/api",
    createExpressMiddleware({
        router: router,
        createContext: context,
    })
);

app.listen(3000, () => {
    console.log("server started listening");
});
