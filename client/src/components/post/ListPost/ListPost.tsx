import { trpc } from "../../../utils/trpc";

const ListPost = () => {
    const mutation = trpc.getPosts.useQuery();

    return (
        <>
            <h3
                style={{
                    display: mutation.data?.length === 0 ? "none" : "inherit",
                }}
            >
                List of Post
            </h3>
            {mutation.data?.map((post) => {
                return (
                    <ul
                        style={{
                            listStyleType: "none",
                        }}
                        key={post.id}
                    >
                        <li>id: {post.id}</li>
                        <li>title: {post.title}</li>
                        <li>description: {post.description}</li>
                        <li>username: {post.user.username}</li>
                    </ul>
                );
            })}
        </>
    );
};

export default ListPost;
