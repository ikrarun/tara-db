import React from 'react'
import { serverClient } from "TRPC/serverClient";
import BookCard from "components/Cards/BookCard";


const book_of_day = async() => {
    const data = await serverClient.get_books(1);
  const book = data ? data[0]:null
    return (book === null|| typeof(book) === 'undefined') ? (
    <BookCard
      title={"Can't Recommend Any Book Right Now"}
      desc={"Try again after a while"}
    />
  ) : (
    <BookCard
      imageUrl={book.imageUrl}
      link={book.link}
      title={book.title}
      desc={book.desc}
    />
  );
}

export default book_of_day