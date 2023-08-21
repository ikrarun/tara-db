import Suggest_Reading from "@/UI/Sections/Home/suggest_reading";
import Myths_Busting from "@/UI/Sections/Home/myth_busting";
import Quotes_Of_Day from "@/UI/Sections/Home/quote_of_day";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-2 mx-auto">
      <Quotes_Of_Day />
      <Myths_Busting />
      <Suggest_Reading />
    </div>
  );
}
