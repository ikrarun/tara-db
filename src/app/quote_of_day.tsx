import React from "react";
import QuoteCard from "components/Cards/QuoteCard";
import { serverClient } from "TRPC/serverClient";

const quote_of_day = async () => {
  const data = await serverClient.get_quotes();

  return data === null ? (
    <QuoteCard />
  ) : (
    <QuoteCard quote={data.content} author={data.author} />
  );
};

export default quote_of_day;
