import { initTRPC, inferAsyncReturnType } from "@trpc/server";
import context from "./context";

type Context = inferAsyncReturnType<typeof context>;
const trpc = initTRPC.context<Context>().create();

export default trpc;
