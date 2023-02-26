import { trpc } from "../../../utils/trpc";

const ListTodo = () => {
    const mutation = trpc.getToDos.useQuery();

    return (
        <>
            <h3
                style={{
                    display: mutation.data?.length === 0 ? "none" : "inherit",
                }}
            >
                List of Todo
            </h3>
            {mutation.data?.map((todo) => {
                return (
                    <ul
                        style={{
                            listStyleType: "none",
                        }}
                        key={todo.id}
                    >
                        <li>id: {todo.id}</li>
                        <li>title: {todo.title}</li>
                        <li>description: {todo.description}</li>
                        <li>username: {todo.user.username}</li>
                        <li>startTime: {todo.startTime}</li>
                        <li>endTime: {todo.endTime}</li>
                    </ul>
                );
            })}
        </>
    );
};

export default ListTodo;
