'use client'

import { useState } from "react"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { trpc } from "./client";
import { httpBatchLink } from "@trpc/react-query";
import { host } from "Lib/Utils/host";

export function Provider({children}:{children:React.ReactNode}){
    const [queryClient] = useState(()=> new QueryClient({}));
    const [trpcClient] = useState (()=> trpc.
    createClient({
        links:[
            httpBatchLink({
                url:`${host}/api/trpc`
            })
        ]
    }))
    return(
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    );
}