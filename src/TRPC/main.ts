import { router } from "./trpc";
import getBooks from './getBooks';
import getQuotes from './getQuotes';
import getArticle from "./getArticle";

export const appRouter = router({
  get_books: getBooks(),
  get_quotes: getQuotes(),
  get_posts: getArticle(),
});
export type AppRouter = typeof appRouter;

