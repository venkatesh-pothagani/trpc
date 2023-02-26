import { TRPCError } from "@trpc/server";
import { z as zod } from "zod";

import { publicProcedure, privateProcedure } from "../procedure";
import { router } from "../router";
import UserController from "../controllers/user";

const userRouter = router({
    signup: publicProcedure
        .input(
            zod.object({
                fullName: zod.string(),
                username: zod.string(),
                password: zod.string(),
            })
        )
        .mutation(async (data) => {
            try {
                return await UserController.signup(data.input);
            } catch (error) {
                throw new TRPCError({
                    message: "Failed to save user",
                    code: "INTERNAL_SERVER_ERROR",
                    cause: error,
                });
            }
        }),

    getUsers: publicProcedure.query(async () => {
        try {
            return await UserController.get();
        } catch (error) {
            throw new TRPCError({
                message: "Failed to save users",
                code: "INTERNAL_SERVER_ERROR",
                cause: error,
            });
        }
    }),

    getUserById: privateProcedure
        .input(zod.object({ id: zod.number() }))
        .query(async (data) => {
            try {
                return await UserController.getById(data.input.id);
            } catch (error) {
                throw new TRPCError({
                    message: "Failed to fetch user",
                    code: "INTERNAL_SERVER_ERROR",
                    cause: error,
                });
            }
        }),

    signin: publicProcedure
        .input(zod.object({ username: zod.string(), password: zod.string() }))
        .mutation(async (data) => {
            try {
                return await UserController.signin(
                    data.input.username,
                    data.input.password
                );
            } catch (error) {
                throw new TRPCError({
                    message: "Failed to fetch user",
                    code: "INTERNAL_SERVER_ERROR",
                    cause: error,
                });
            }
        }),
});

export default userRouter;
