import Quote_of_day from "./quote_of_day";
import Book_of_day from "./book_of_day";
import Featured_article from "./featured_article";

const Home = () => {
  return (
    <div className="grow min-h-max w-full flex gap-3 flex-col">
      <div className="flex gap-3 flex-col w-full sm:flex-row ">
          <Book_of_day />
          <Quote_of_day />
      </div>
      <div className="h-fit flex w-full flex-col items-start justify-start">
          <Featured_article />
      </div>
    </div>
  );
};

export default Home;
