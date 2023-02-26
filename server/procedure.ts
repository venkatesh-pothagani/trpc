import trpc from "./trpc";
import isAuthenticated from "./middlewares/isAuthenticated";

export const publicProcedure = trpc.procedure;
export const privateProcedure = trpc.procedure.use(isAuthenticated);
