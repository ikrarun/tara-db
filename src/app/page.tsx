import Suggest_Reading from "@/components/Sections/Home/suggest_reading";
import Myths_Busting from "@/components/Sections/Home/myth_busting";
import Quotes_Of_Day from "@/components/Sections/Home/quote_of_day";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-2 mx-auto">
      <Quotes_Of_Day />
      <Myths_Busting />
      <Suggest_Reading />
    </div>
  );
}
