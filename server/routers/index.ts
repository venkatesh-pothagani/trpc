import { mergeRouters } from "../router";
import userRouter from "./user";
import postRouter from "./post";
import todoRouter from "./todo";

const rootRouter = mergeRouters(userRouter, postRouter, todoRouter);

export default rootRouter;
export type TRPCRouter = typeof rootRouter;
