import { appRouter } from "./main";
import { httpBatchLink } from "@trpc/client";
import { host } from "Lib/Utils/host";

export const serverClient = appRouter.createCaller({
    links:[
        httpBatchLink({
            url:`${host}/api/trpc`
        })
    ]
})