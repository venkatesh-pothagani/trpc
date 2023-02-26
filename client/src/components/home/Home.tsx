import { useState } from "react";
import SignIn from "../auth/SignIn/SignIn";
import SignUp from "../auth/SignUp/SignUp";

import AddPost from "../post/AddPost/AddPost";
import ListPost from "../post/ListPost/ListPost";

import AddTodo from "../todo/AddTodo/AddTodo";
import ListTodo from "../todo/ListTodo/ListTodo";

const Home = () => {
    const [refresh, setRefresh] = useState(true);

    return (
        <>
            <div
                style={{
                    display:
                        localStorage.getItem("trpc-auth-token") !== null
                            ? "none"
                            : "inherit",
                }}
            >
                <SignIn />
                <SignUp />
            </div>

            <div
                style={{
                    display:
                        localStorage.getItem("trpc-auth-token") === null
                            ? "none"
                            : "inherit",
                }}
            >
                <button
                    onClick={() => {
                        localStorage.removeItem("trpc-auth-token");
                        setRefresh(!refresh);
                    }}
                >
                    Sign Out
                </button>
            </div>

            <div
                style={{
                    display:
                        localStorage.getItem("trpc-auth-token") === null
                            ? "none"
                            : "inherit",
                }}
            >
                <AddPost />
                <AddTodo />
            </div>

            <div>
                <ListPost />
                <ListTodo />
            </div>
        </>
    );
};

export default Home;
