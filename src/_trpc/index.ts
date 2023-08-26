import get_all_post from "./endpoints/get_all_post";
import { router } from "_trpc/_important/trpc";
import get_Unique from "./endpoints/get_Unique";
import get_Quotes from "./endpoints/getQuotes";
import suggested_readings from "./endpoints/get_suggested_readings";
import join_us from "./endpoints/join_us";

export const appRouter = router({
  getAllPost: get_all_post(),
  getQuotes: get_Quotes(),
  getUnique: get_Unique(),
  getBooks: suggested_readings(),
  joiningRequest: join_us(),
});
export type AppRouter = typeof appRouter;
