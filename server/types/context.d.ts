import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { Payload } from "./../utils/tokenization";

interface ContextOptions extends CreateExpressContextOptions {
    payload: Payload;
}

export default ContextOptions;
