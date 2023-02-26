import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import ContextOptions from "./types/context";
import { Payload } from "./utils/tokenization";

const context = ({ req, res }: CreateExpressContextOptions): ContextOptions => {
    const payload: Payload = {
        id: 0,
        fullName: "",
        username: "",
    };

    return { req, res, payload };
};

export default context;
