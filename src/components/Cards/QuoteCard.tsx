interface QuoteComponents {
  quote?: string;
  author?: string;
}

const QuoteCard = ({ quote, author }: QuoteComponents) => (
  <div className="sm:h-full h-fit grow w-full sm:w-1/2 relative rounded-lg overflow-hidden">
    {/* Background Image */}
    <div
      className="absolute aspect-video sm:aspect-auto -z-10 top-0 left-0 w-full h-full bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(https://picsum.photos/640/360)`,
        filter: "blur(2px)",
      }}
    />
    {/* Content */}
    <div className="p-4 w-full z-20 flex bg-gradient-to-t from-black/90 to-black/60 h-full gap-3 items-start justify-end flex-col text-white rounded-lg">
      <h1 className="text-sm font-light">Quote of the Day</h1>
      <h1 className="text-2xl font-bold">{quote ?? ""}</h1>
      <h1 className="text-lg font-semibold">{author ?? ""}</h1>
    </div>
  </div>
);

export default QuoteCard;
