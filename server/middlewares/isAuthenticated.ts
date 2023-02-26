import { TRPCError } from "@trpc/server";

import trpc from "../trpc";
import Tokenization from "../utils/tokenization";

const isAuthenticated = trpc.middleware(({ ctx, next }) => {
    const token = ctx.req.headers["authorization"];

    if (!token) {
        throw new TRPCError({
            code: "FORBIDDEN",
            message: `authorization token required`,
        });
    }

    const payload = Tokenization.validate(token.split(" ")[1]);

    return next({
        ctx: {
            ...ctx,
            payload: payload,
        },
    });
});

export default isAuthenticated;
