// utils/trpc.ts
import { createTRPCReact } from "@trpc/react-query";
import { TRPCRouter } from "../../../server/routers";

export const trpc = createTRPCReact<TRPCRouter>();
