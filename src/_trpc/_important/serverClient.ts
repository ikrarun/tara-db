import { appRouter } from "_trpc";
import { httpBatchLink } from "@trpc/client";
import { host } from "app/host";


export const serverClient = appRouter.createCaller({
    links:[
        httpBatchLink({
            url:`${host}/api/trpc`
        })
    ]
})