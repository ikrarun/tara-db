import Sugg_Reading from "./UI/Sections/sugg_reading";
import Myths_Busting from "./UI/Sections/myth_busting";
import QuoteofDay from "./UI/Sections/quoteofday";
import Footer from "./UI/footer";
import NAV from "./UI/nav";
export default function Home() {
  return (
    <div className="flex flex-col">
      <NAV />
      <div className="w-full my-5  p-2 flex">
        <div className="max-w-[900px] mx-auto w-full mt-14 min-h-screen flex flex-col gap-2  items-center justify-center">
          {/* Quote of the Day */}
          <QuoteofDay/>
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
