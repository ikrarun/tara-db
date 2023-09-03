import React from 'react'
import { serverClient } from "TRPC/serverClient";
import BookCard from "components/Cards/BookCard";


const book_of_day = async() => {
    const data = await serverClient.get_books();

    return data === null ? (
    <BookCard
      title={"Can't Recommend Any Book Right Now"}
      desc={"Try again after a while"}
    />
  ) : (
    <BookCard
      imageUrl={data.imageUrl}
      link={data.link}
      title={data.title}
      desc={data.desc}
    />
  );
}

export default book_of_day