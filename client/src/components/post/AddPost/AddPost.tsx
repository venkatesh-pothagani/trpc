import { ChangeEvent, FormEvent, useState } from "react";

import { trpc } from "../../../utils/trpc";

const AddPost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const mutation = trpc.addPost.useMutation();

    const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setTitle(event.target.value);
    };

    const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        setDescription(event.target.value);
    };

    const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate({ title, description });
    };

    return (
        <>
            <h3>Add Post</h3>
            <form onSubmit={onFormSubmit}>
                <div className="post-title">
                    <input
                        type="text"
                        name="post-title"
                        id="post-title"
                        placeholder="enter title"
                        onChange={onTitleChange}
                        required
                    />
                </div>
                <div className="post-description">
                    <textarea
                        name="post-description"
                        id="post-description"
                        cols={22}
                        rows={2}
                        placeholder="enter description"
                        onChange={onDescriptionChange}
                    ></textarea>
                </div>
                <div className="submit-button">
                    <input type="submit" value="Add Post" />
                </div>
            </form>

            {mutation.error && (
                <p>Something went wrong! {mutation.error.message}</p>
            )}
            {mutation.isSuccess && <p>Post added. Please refresh page</p>}
        </>
    );
};

export default AddPost;
