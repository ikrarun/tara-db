import Sugg_Reading from "@/app/sugg_reading";
import Myths_Busting from "@/app/myth_busting";
import QuoteofDay from "@/app/quoteofday";
import Footer from "@/UI/footer";
import NAV from "@/UI/nav";

export default async function Home() {
  return (
    <div className="flex flex-col">
      <NAV />
      <div className="w-full my-5  p-2 flex">
        <div className="max-w-[900px] mx-auto w-full mt-14 min-h-screen flex flex-col gap-2  items-center justify-center">
          {/* Quote of the Day */}
          <QuoteofDay />
          {/* Myth Busting */}
          <Myths_Busting />
          {/* Suggested Readings */}
          <Sugg_Reading />
        </div>
      </div>
      <Footer />
    </div>
  );
}
