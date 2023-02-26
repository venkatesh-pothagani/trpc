import { useState, ChangeEvent, FormEvent } from "react";

import { trpc } from "../../../utils/trpc";

const AddTodo = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");

    const mutation = trpc.addToDo.useMutation();

    if (mutation.isSuccess) {
    }

    const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setTitle(event.target.value);
    };

    const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        setDescription(event.target.value);
    };

    const onStartTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setStartTime(event.target.value);
    };

    const onEndTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setEndTime(event.target.value);
    };

    const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate({ title, description, startTime, endTime });
    };

    return (
        <>
            <h3>Add Todo</h3>
            <form onSubmit={onFormSubmit}>
                <div className="todo-title">
                    <input
                        type="text"
                        name="todo-title"
                        id="title"
                        placeholder="enter title"
                        onChange={onTitleChange}
                        required
                    />
                </div>
                <div className="todo-description">
                    <textarea
                        name="todo-description"
                        id="todo-description"
                        cols={22}
                        rows={2}
                        placeholder="enter description"
                        onChange={onDescriptionChange}
                    ></textarea>
                </div>
                <div className="start-time">
                    <input
                        type="datetime-local"
                        name="start-time"
                        id="start-time"
                        placeholder="start time"
                        onChange={onStartTimeChange}
                    />
                </div>
                <div className="end-time">
                    <input
                        type="datetime-local"
                        name="end-time"
                        id="end-time"
                        placeholder="end time"
                        onChange={onEndTimeChange}
                    />
                </div>
                <div className="submit-button">
                    <input type="submit" value="Add Todo" />
                </div>
            </form>
            {mutation.error && (
                <p>Something went wrong! {mutation.error.message}</p>
            )}
            {mutation.isSuccess && <p>ToDo added. Please refresh page</p>}
        </>
    );
};

export default AddTodo;
