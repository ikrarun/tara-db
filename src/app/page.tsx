import Sugg_Reading from "@/app/sugg_reading";
import Myths_Busting from "@/app/myth_busting";
import QuoteofDay from "@/app/quoteofday";

export default async function Home() {
  return (
    <div className="mx-auto w-full flex flex-col gap-2  items-center justify-center">
      {/* Quote of the Day */}
      <QuoteofDay />
      {/* Myth Busting */}
      <Myths_Busting />
      {/* Suggested Readings */}
      <Sugg_Reading />
    </div>
  );
}
