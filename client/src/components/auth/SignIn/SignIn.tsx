import { ChangeEvent, FormEvent, useState } from "react";

import { trpc } from "../../../utils/trpc";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const mutation = trpc.signin.useMutation();

    if (mutation.isSuccess) {
        localStorage.setItem("trpc-auth-token", mutation.data.token);
    }

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

        mutation.mutate({ username, password });
    };

    return (
        <>
            <h3>Sign In</h3>
            <form onSubmit={onFormSubmit}>
                <div className="sign-in-username">
                    <input
                        type="text"
                        name="sign-in-username"
                        id="sign-in-username"
                        placeholder="enter username"
                        onChange={onUsernameChange}
                        required
                    />
                </div>
                <div className="sign-in-password">
                    <input
                        type="password"
                        name="sign-in-password"
                        id="sign-in-password"
                        placeholder="enter password"
                        onChange={onPasswordChange}
                        required
                    />
                </div>
                <div className="submit-button">
                    <input type="submit" value="Sign In" />
                </div>
            </form>

            {mutation.error && (
                <p>Something went wrong! {mutation.error.message}</p>
            )}

            {mutation.isSuccess && <p>User Logged In. Please refresh page</p>}
        </>
    );
};

export default SignIn;
