import { TRPCError } from "@trpc/server";

import { PrismaClient } from "@prisma/client";
import Post from "../types/post";

class PostController {
    static database = new PrismaClient();

    static save = async (post: Post) => {
        return await this.database.post.create({ data: post });
    };

    static get = async () => {
        return await this.database.post.findMany({
            include: {
                user: true,
            },
        });
    };

    static getById = async (id: number) => {
        try {
            return await this.database.post.findUniqueOrThrow({
                where: { id: id },
                include: {
                    user: true,
                },
            });
        } catch (error) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `post not found of given id[${id}]`,
                cause: error,
            });
        }
    };
}

export default PostController;
