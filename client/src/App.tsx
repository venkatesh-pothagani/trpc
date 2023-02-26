import Home from "./components/home/Home";

import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "./utils/trpc";

function App() {
    const [queryClient] = useState(() => new QueryClient());

    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: "http://localhost:3000/api",
                    headers() {
                        return {
                            authorization:
                                "Bearer " +
                                localStorage.getItem("trpc-auth-token"),
                        };
                    },
                }),
            ],
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <div className="App">
                    <Home />
                </div>
            </QueryClientProvider>
        </trpc.Provider>
    );
}

export default App;
