import { ChangeEvent, FormEvent, useState } from "react";

import { trpc } from "../../../utils/trpc";

const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const mutation = trpc.signup.useMutation();

    if (mutation.isError) {
        console.log("error occured");
    }

    if (mutation.isLoading) {
        console.log("loading");
    }

    if (mutation.isSuccess) {
        console.log("success");
    }

    const onFullNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setFullName(event.target.value);
    };
    const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setUsername(event.target.value);
    };

    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setPassword(event.target.value);
    };

    const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        mutation.mutate({ username, password, fullName });
    };

    return (
        <>
            <h3>Sign Up</h3>
            <form onSubmit={onFormSubmit}>
                <div className="sign-up-full-name">
                    <input
                        type="text"
                        name="sign-up-full-name"
                        id="sign-up-full-name"
                        placeholder="enter full name"
                        onChange={onFullNameChange}
                        required
                    />
                </div>
                <div className="sign-up-username">
                    <input
                        type="text"
                        name="sign-up-username"
                        id="sign-up-username"
                        placeholder="enter username"
                        onChange={onUsernameChange}
                        required
                    />
                </div>
                <div className="password">
                    <input
                        type="password"
                        name="sign-up-password"
                        id="sign-up-password"
                        placeholder="enter password"
                        onChange={onPasswordChange}
                        required
                    />
                </div>
                <div className="submit-button">
                    <input type="submit" value="Sign Up" />
                </div>
            </form>
            {mutation.error && (
                <p>Something went wrong! {mutation.error.message}</p>
            )}
            {mutation.isSuccess && <p>User added</p>}
        </>
    );
};

export default SignUp;
