import { router } from "./trpc";
import getBooks from './getBooks';
import getQuotes from './getQuotes';
import getArticles from "./getArticles";
import getDetailedArticle from "./getDetailedArticle";
import createArticles from "./createArticles";
import suggestBook from "./suggestBook";
import updateProfile from "./updateProfile";

export const appRouter = router({
  get_books: getBooks(),
  get_quotes: getQuotes(),
  get_Detail_Post:getDetailedArticle(),
  get_posts: getArticles(),
  create_Article: createArticles(),
  suggestBooks: suggestBook(),
  updateProfile:updateProfile()
});
export type AppRouter = typeof appRouter;

