import Link from "next/link";
interface BookComponents {
  imageUrl?: string;
  link?: string;
  title: string;
  desc: string;
  griditem?: boolean;
}

const BookCard = ({
  imageUrl,
  link,
  title,
  desc,
  griditem,
}: BookComponents) => {

  function makeHttporHttps(url:string) {
    // Check if the URL starts with "http://" or "https://"
    return (url.startsWith("http://") || url.startsWith("https://"))?url:'https://'+url;
  }
 return <div
    className={
      griditem
        ? "sm:h-full h-fit w-full relative rounded-lg overflow-hidden"
        : "sm:w-1/2 sm:h-full h-fit w-full relative rounded-lg overflow-hidden"
    }
  >
    {/* Background Image */}
    <div
      className="absolute -z-10 top-0 left-0 w-full h-full bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${imageUrl || "https://picsum.photos/640/360"})`,
        filter: "blur(2px)",
      }}
    />
    {/* Content */}
    <Link
      href={(link && link?.length > 0) ? makeHttporHttps(link) : '/'}
      target="_blank"
      className="p-4 w-full z-20 flex bg-gradient-to-t from-black/90 to-black/60 h-full gap-3 items-start justify-end flex-col text-white rounded-lg"
    >
      <h1 className="text-sm font-semibold">Book of the Day</h1>
      <h1 className="text-2xl font-bold">{title}</h1>
      <h1 className="text-base font-semibold">{desc}</h1>
    </Link>
  </div>
};

export default BookCard;
