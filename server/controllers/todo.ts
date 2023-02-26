import { PrismaClient } from "@prisma/client";
import ToDo from "../types/todo";

class ToDoController {
    static database = new PrismaClient();

    static save = async (todo: ToDo) => {
        return await this.database.todo.create({ data: todo });
    };

    static get = async () => {
        return await this.database.todo.findMany({
            include: {
                user: true,
            },
        });
    };

    static getById = async (id: number) => {
        return await this.database.todo.findUniqueOrThrow({
            where: { id: id },
            include: {
                user: true,
            },
        });
    };
}

export default ToDoController;
