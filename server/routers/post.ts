import { TRPCError } from "@trpc/server";
import { z as zod } from "zod";

import { publicProcedure, privateProcedure } from "../procedure";
import { router } from "../router";
import PostController from "../controllers/post";

const postRouter = router({
    addPost: privateProcedure
        .input(
            zod.object({
                title: zod.string(),
                description: zod.string(),
            })
        )
        .mutation(async (data) => {
            try {
                return await PostController.save({ ...data.input, userId: 1 });
            } catch (error) {
                throw new TRPCError({
                    message: "Failed to save post",
                    code: "INTERNAL_SERVER_ERROR",
                    cause: error,
                });
            }
        }),

    getPosts: publicProcedure.query(async () => {
        try {
            return await PostController.get();
        } catch (error) {
            throw new TRPCError({
                message: "Failed to fetch posts",
                code: "INTERNAL_SERVER_ERROR",
                cause: error,
            });
        }
    }),

    getPostById: privateProcedure
        .input(zod.object({ id: zod.number() }))
        .output(zod.object({ id: zod.number() }))
        .query(async (data) => {
            try {
                return await PostController.getById(data.input.id);
            } catch (error) {
                throw new TRPCError({
                    message: "Failed to fetch post",
                    code: "INTERNAL_SERVER_ERROR",
                    cause: error,
                });
            }
        }),
});

export default postRouter;
