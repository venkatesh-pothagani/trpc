import { TRPCError } from "@trpc/server";
import { z as zod } from "zod";

import { router } from "../router";
import { publicProcedure, privateProcedure } from "../procedure";
import ToDoController from "../controllers/todo";

const todoRouter = router({
    addToDo: privateProcedure
        .input(
            zod.object({
                title: zod.string(),
                description: zod.string(),
                startTime: zod.string(),
                endTime: zod.string(),
            })
        )
        .mutation(async (data) => {
            try {
                return await ToDoController.save({
                    ...data.input,
                    userId: data.ctx.payload.id,
                });
            } catch (error) {
                throw new TRPCError({
                    message: "Failed to save todo",
                    code: "INTERNAL_SERVER_ERROR",
                    cause: error,
                });
            }
        }),

    getToDos: publicProcedure.query(async () => {
        try {
            return await ToDoController.get();
        } catch (error) {
            throw new TRPCError({
                message: "Failed to fetch todo's",
                code: "INTERNAL_SERVER_ERROR",
                cause: error,
            });
        }
    }),

    getToDoById: privateProcedure
        .input(
            zod.object({
                id: zod.number(),
            })
        )
        .mutation(async (data) => {
            try {
                return await ToDoController.getById(data.input.id);
            } catch (error) {
                throw new TRPCError({
                    message: "Failed to fetch todo",
                    code: "INTERNAL_SERVER_ERROR",
                    cause: error,
                });
            }
        }),
});

export default todoRouter;
