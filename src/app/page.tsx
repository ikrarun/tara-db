import Quote_of_day from "./quote_of_day";
import Book_of_day from "./book_of_day";
import Featured_article from "./featured_article";
import { Suspense } from 'react';

const Home= ()=> {
  return (
    <div className="grow w-full flex gap-3 flex-col">
      <div className="flex gap-3 flex-col w-full sm:flex-row ">
        <Suspense fallback={<h1 className='animate-pulse'>Loading...</h1>}>
        <Book_of_day/>
        </Suspense>
        <Suspense fallback={<h1 className='animate-pulse'>Loading...</h1>}>
        <Quote_of_day/>
        </Suspense>
      </div>
      <div className="h-fit flex w-full flex-col items-start justify-start">
        <Suspense fallback={<h1 className='animate-pulse'>Loading...</h1>}>
        <Featured_article/>
        </Suspense>
      </div>
    </div>
  );
}





export default Home;