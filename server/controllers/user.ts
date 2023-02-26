import { PrismaClient } from "@prisma/client";
import User from "../types/user";
import Tokenization from "../utils/tokenization";
import { TRPCError } from "@trpc/server";

class UserController {
    static database = new PrismaClient();

    static signup = (user: User) => {
        return this.database.user.create({ data: user });
    };

    static get = () => {
        return this.database.user.findMany();
    };

    static getById = (id: number) => {
        return this.database.user.findUniqueOrThrow({ where: { id: id } });
    };

    static signin = async (username: string, password: string) => {
        const user = await this.database.user.findFirst({
            where: {
                username,
                password,
            },
        });

        if (!user) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: `invalid credentials`,
            });
        }

        return {
            token: Tokenization.generate({
                id: user.id,
                fullName: user.fullName,
                username: user.username,
            }),
            fullName: user.fullName,
            username: user.username,
        };
    };
}

export default UserController;
